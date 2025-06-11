import { For, createEffect, createSignal, onCleanup } from "solid-js";
import { createMutation, gql, useApollo } from "@psre/apollo";
import {
  CreateMessageMutation,
  CreateMessageMutationVariables,
  GetNewChatMessagesSubscription,
  GetNewChatMessagesSubscriptionVariables,
} from "./create-chat.gql.types";
import { ChatMessage } from "@psre/types";

export const createChat = () => {
  const apolloClient = useApollo();
  const [messages, setMessages] = createSignal<ChatMessage[]>([]);
  const [chatId, setChatId] = createSignal("1");

  // apolloClient.query<GetChatMessagesQuery, GetChatMessagesQueryVariables>({
  //     query: gql`
  //       query GetChatMessages($chatId: String!) {
  //         chatMessages(chatId: $chatId) {
  //           id
  //           content
  //           accountId
  //           chatId
  //           createdAt
  //         }
  //       }
  //     `,
  //     variables: {
  //       chatId: '1',
  //     }
  //   }).then((data) => {
  //     console.log(data?.data.chatMessages);
  //   });

  const [createMessage] = createMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(gql`
    mutation CreateMessage($input: SendMessageInput!) {
      createChatMessage(input: $input)
    }
  `);

  const subscription = apolloClient
    .subscribe<
      GetNewChatMessagesSubscription,
      GetNewChatMessagesSubscriptionVariables
    >({
      query: gql`
        subscription GetNewChatMessages($chatId: String!) {
          createdChatMessage(chatId: $chatId) {
            id
            content
            accountId
            chatId
            createdAt
          }
        }
      `,
      variables: {
        chatId: chatId(),
      },
    })
    .subscribe({
      // error: reject,
      next: ({ data }) => {
        const newMessage = data?.createdChatMessage;
        setMessages((messages) => [...messages, newMessage]);
      },
    });

  onCleanup(() => subscription.unsubscribe());

  return {
    messages,
    createMessage: (content: string) =>
      createMessage({
        variables: {
          input: {
            chatId: chatId(),
            content,
          },
        },
      }),
  };
};
