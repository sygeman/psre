import { builder } from "@psre/tools";

export type ChatMessageAuthorType = {
  id: string;
  name: string;
};

export const ChatMessageAuthor = builder
  .objectRef<ChatMessageAuthorType>("ChatMessageAuthor")
  .implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      name: t.exposeString("name"),
    }),
  });
