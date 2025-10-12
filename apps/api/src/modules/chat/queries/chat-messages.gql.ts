import { gqlBuilder } from "@/lib/pothos"
import { ChatMessage } from "../types/chat-message.type"

gqlBuilder.queryType({
  fields: (t) => ({
    chatMessages: t.field({
      type: [ChatMessage],
      args: {
        chatId: t.arg({ type: "String", required: true }),
      },
      resolve: (_parent, { chatId }) => {
        console.log("get messages for ", chatId)
        return []
      },
    }),
  }),
})
