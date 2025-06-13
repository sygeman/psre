import { For, createEffect, createSignal, onCleanup } from "solid-js";
import { createMutation, gql, useApollo } from "@psre/apollo";
import {
  ChatCleanupSubscription,
  ChatCleanupSubscriptionVariables,
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

const CHAT_CLEANUP_SUBSCRIPTION = gql`
  subscription ChatCleanup($chatId: String!) {
    chatCleanup(chatId: $chatId)
  }
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
    const newMessageSubscription = apolloClient
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

    const cleanupSubscription = apolloClient
      .subscribe<ChatCleanupSubscription, ChatCleanupSubscriptionVariables>({
        query: CHAT_CLEANUP_SUBSCRIPTION,
        variables: { chatId: chatId() },
      })
      .subscribe({
        // error: reject,
        next: () => {
          setMessages([]);
        },
      });

    updateChatHistory();

    onCleanup(() => {
      setMessages([]);
      newMessageSubscription.unsubscribe();
      cleanupSubscription.unsubscribe();
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
