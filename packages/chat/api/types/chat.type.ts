import { builder } from "@psre/tools";
import { ChatMessageType, ChatMessage } from "./chat-message.type";

type Chat = {
  id: string;
  type: string;
  messages: ChatMessageType[];
};

export const Chat = builder.objectRef<Chat>("Chat").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    type: t.exposeString("type"),
    messages: t.expose("messages", { type: [ChatMessage] }),
  }),
});
