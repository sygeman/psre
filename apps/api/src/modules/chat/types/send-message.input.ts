import { gqlBuilder } from "@/lib/pothos"

export const SendMessageInput = gqlBuilder.inputType("SendMessageInput", {
  fields: (t) => ({
    chatId: t.string({ required: true }),
    content: t.string({ required: true }),
  }),
})
