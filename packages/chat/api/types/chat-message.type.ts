import { builder } from "@psre/tools";
import {
  ChatMessageAuthor,
  ChatMessageAuthorType,
} from "./chat-message-author.type";

export type ChatMessageType = {
  id: string;
  content: string;
  author: ChatMessageAuthorType;
  date_created: Date;
};

export const ChatMessage = builder
  .objectRef<ChatMessageType>("ChatMessage")
  .implement({
    fields: (t) => ({
      id: t.exposeID("id"),
      content: t.exposeString("content"),
      author: t.expose("author", { type: ChatMessageAuthor }),
      date_created: t.expose("date_created", { type: "DateTime" }),
    }),
  });
