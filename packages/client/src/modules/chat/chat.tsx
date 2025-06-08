import { GetChatMessagesQuery, GetChatMessagesQueryVariables } from "./chat.gql.types";
import { apolloClient, gql } from "@/lib/apollo";

export const Chat = () => {
  apolloClient.query<GetChatMessagesQuery, GetChatMessagesQueryVariables>({
    query: gql`
      query GetChatMessages($chatId: String!) {
        chatMessages(chatId: $chatId) {
          id
          content
          accountId
          chatId
          createdAt
        }
      }
    `,
    variables: {
      chatId: '1', 
    }
  }).then((data) => {
    console.log(data?.data.chatMessages);
  });

  return (
    <div>
      <h1>Chat Module</h1>
    </div>
  );
};