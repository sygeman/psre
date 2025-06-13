import { For, createEffect, createSignal, onCleanup } from "solid-js";
import { createMutation, gql, useApollo } from "@psre/apollo";
import {
  CreateMessageMutation,
  CreateMessageMutationVariables,
  GetNewChatMessagesSubscription,
  GetNewChatMessagesSubscriptionVariables,
} from "./create-chat.gql.types";
import { ChatMessage } from "@psre/types";
import { chatStore } from "./store";

const CHAT_MESSAGE_FRAGMENT = gql`
  fragment ChatMessageFragment on ChatMessage {
    id
    content
    author {
      id
      name
    }
    date_created
  }
`;

const CHATS_QUERY = gql`
  query GetChats {
    chats {
      id
      type
      messages {
        ...ChatMessageFragment
      }
    }
  }

  ${CHAT_MESSAGE_FRAGMENT}
`;

const CHAT_NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription GetNewChatMessages($chatId: String!) {
    createdChatMessage(chatId: $chatId) {
      ...ChatMessageFragment
    }
  }

  ${CHAT_MESSAGE_FRAGMENT}
`;

export const createChat = () => {
  const apolloClient = useApollo();
  const [messages, setMessages] = createSignal<ChatMessage[]>([]);
  const [chatId, setChatId] = createSignal<string | null>(null);

  const updateChatHistory = () => {
    apolloClient.query({ query: CHATS_QUERY }).then((data) => {
      const chat = data?.data.chats.find(
        (chat) => chat.type === chatStore.activeChannel,
      );
      setChatId(chat.id);
      setMessages(chat.messages);
    });
  };

  const [createMessage] = createMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(gql`
    mutation CreateMessage($input: SendMessageInput!) {
      createChatMessage(input: $input)
    }
  `);

  createEffect(() => {
    const subscription = apolloClient
      .subscribe<
        GetNewChatMessagesSubscription,
        GetNewChatMessagesSubscriptionVariables
      >({
        query: CHAT_NEW_MESSAGE_SUBSCRIPTION,
        variables: { chatId: chatId() },
      })
      .subscribe({
        // error: reject,
        next: ({ data }) => {
          const newMessage = data?.createdChatMessage;
          setMessages((messages) => [...messages, newMessage]);
        },
      });

    updateChatHistory();

    onCleanup(() => {
      setMessages([]);
      subscription.unsubscribe();
    });
  });

  return {
    messages,
    createMessage: (content: string) => {
      if (typeof chatId() !== "string") return;
      createMessage({
        variables: {
          input: {
            chatId: chatId(),
            content,
          },
        },
      });
    },
  };
};
