import { builder } from "@psre/tools";

export const SendMessageInput = builder.inputType("SendMessageInput", {
  fields: (t) => ({
    chatId: t.string({ required: true }),
    content: t.string({ required: true }),
  }),
});
