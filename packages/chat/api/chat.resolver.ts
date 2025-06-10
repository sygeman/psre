import { builder } from "@psre/gql-tools";
import { ChatMessage } from "./types/chat-message.type";
import { SendMessageInput } from "./types/send-message.input";

export const buildChatModule = () => {
  builder.queryType({
    fields: (t) => ({
      chatMessages: t.field({
        type: [ChatMessage],
        args: {
          chatId: t.arg.string(),
        },
        resolve: (_parent, { chatId }) => {
          console.log(chatId);
          return [];
        },
      }),
    }),
  });

  builder.mutationType({
    fields: (t) => ({
      createChatMessage: t.boolean({
        args: {
          input: t.arg({ type: SendMessageInput, required: true }),
        },
        resolve: (_parent, { input }) => {
          console.log(input);
          return true;
        },
      }),
    }),
  });

  builder.subscriptionType({
    fields: (t) => ({
      createdChatMessage: t.field({
        type: ChatMessage,
        args: {
          chatId: t.arg.string(),
        },
        subscribe: (_parent, { chatId }, { pubsub }) => {
          return pubsub.subscribe("createdChatMessage", chatId);
        },
        resolve: (message) => message,
      }),
    }),
  });
};
