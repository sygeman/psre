import { gqlBuilder } from "@/lib/pothos"

export type ChatMessageAuthorType = {
  id: string
  name: string
}

export const ChatMessageAuthor = gqlBuilder.objectRef<ChatMessageAuthorType>("ChatMessageAuthor").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
  }),
})
