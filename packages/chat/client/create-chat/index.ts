import { createEffect, createSignal, onCleanup } from "solid-js";
import { createMutation, useApollo } from "@psre/apollo";
import {
  ChatCleanupSubscription,
  ChatCleanupSubscriptionVariables,
  CreateMessageMutation,
  CreateMessageMutationVariables,
  GetChatsQuery,
  GetChatsQueryVariables,
  GetNewChatMessagesSubscription,
  GetNewChatMessagesSubscriptionVariables,
} from "./create-chat.gql.types";
import { ChatMessage } from "@psre/types";
import { chatStore } from "../store";
import {
  CHAT_CLEANUP_SUBSCRIPTION,
  CHAT_NEW_MESSAGE_SUBSCRIPTION,
  CHATS_QUERY,
  CREATE_MESSAGE_MUTATION,
} from "./gql";

export const createChat = () => {
  const apolloClient = useApollo();
  const [messages, setMessages] = createSignal<ChatMessage[]>([]);
  const [chatId, setChatId] = createSignal<string | null>(null);

  const updateChatHistory = () => {
    apolloClient
      .query<GetChatsQuery, GetChatsQueryVariables>({ query: CHATS_QUERY })
      .then((data) => {
        const chat = data?.data.chats.find(
          (chat) => chat.type === chatStore.activeChannel,
        );
        setChatId(chat.id);
        setMessages(chat.messages);
      });
  };

  const [createMessageMutation] = createMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(CREATE_MESSAGE_MUTATION);

  const createMessage = (content: string) => {
    if (typeof chatId() !== "string") return;
    createMessageMutation({
      variables: {
        input: { chatId: chatId(), content },
      },
    });
  };

  createEffect(() => {
    console.log("effect", chatId());
    const _ = chatId();
    if (typeof chatId() !== "string") return;

    console.log("do subs");

    const newMessageSubscription = apolloClient
      .subscribe<
        GetNewChatMessagesSubscription,
        GetNewChatMessagesSubscriptionVariables
      >({
        query: CHAT_NEW_MESSAGE_SUBSCRIPTION,
        variables: { chatId: chatId() },
      })
      .subscribe({
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
        next: () => {
          setMessages([]);
        },
      });

    updateChatHistory();

    onCleanup(() => {
      console.log("cleanup");
      setMessages([]);
      newMessageSubscription.unsubscribe();
      cleanupSubscription.unsubscribe();
    });
  });

  createEffect(() => {
    const _ = chatStore.activeChannel;
    updateChatHistory();
  });

  return {
    messages,
    createMessage,
  };
};
