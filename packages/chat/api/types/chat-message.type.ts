import { builder } from "@psre/tools";

type ChatMessage = {
  id: string;
  content: string;
  accountId: string;
  chatId: string;
  createdAt: Date;
};

export const ChatMessage = builder
  .objectRef<ChatMessage>("ChatMessage")
  .implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      content: t.exposeString("content"),
      accountId: t.exposeString("accountId"),
      chatId: t.exposeString("chatId"),
      createdAt: t.expose("createdAt", { type: "DateTime" }),
    }),
  });
