import { createStore } from "solid-js/store";

export type ChatChannel = "region" | "alliance";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  author: string;
  avatar: string;
  channel: ChatChannel;
}

export const [chatStore, setChatStore] = createStore({
  messages: [] as Message[],
  activeChannel: "region" as ChatChannel,
  regionChatId: undefined as string | undefined,
  allianceChatId: undefined as string | undefined,

  setActiveChannel(channel: ChatChannel) {
    setChatStore("activeChannel", channel);
  },
});
