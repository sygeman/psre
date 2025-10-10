import { builder } from "@/lib/builder";
import { ChatMessage } from "../types/chat-message.type";

builder.queryType({
  fields: (t) => ({
    chatMessages: t.field({
      type: [ChatMessage],
      args: {
        chatId: t.arg({ type: 'String', required: true }),
      },
      resolve: (_parent, { chatId }) => {
        console.log('get messages for ', chatId)
        return []
      },
    }),
  }),
});
