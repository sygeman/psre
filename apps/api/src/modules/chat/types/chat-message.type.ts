import { gqlBuilder } from "@/lib/pothos"
import { ChatMessageAuthor, type ChatMessageAuthorType } from "./chat-message-author.type"

export type ChatMessageType = {
  id: string
  content: string | null
  author: ChatMessageAuthorType | null
  createdAt: Date
}

export const ChatMessage = gqlBuilder.objectRef<ChatMessageType>("ChatMessage").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    content: t.exposeString("content"),
    author: t.expose("author", { type: ChatMessageAuthor }),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
  }),
})
