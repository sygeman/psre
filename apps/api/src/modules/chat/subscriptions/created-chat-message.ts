import { builder } from "@/lib/builder";
import { ChatMessage } from "../types/chat-message.type";

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
