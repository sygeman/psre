import { builder } from "@/lib/builder";

export const SendMessageInput = builder.inputType("SendMessageInput", {
  fields: (t) => ({
    chatId: t.string({ required: true }),
    content: t.string({ required: true }),
  }),
});
