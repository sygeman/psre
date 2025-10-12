import { gqlBuilder } from "@/lib/pothos"
import { ChatMessage, type ChatMessageType } from "./chat-message.type"

type Chat = {
  id: string
  type: string
  messages: ChatMessageType[]
}

export const Chat = gqlBuilder.objectRef<Chat>("Chat").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    type: t.exposeString("type"),
    messages: t.expose("messages", { type: [ChatMessage] }),
  }),
})
