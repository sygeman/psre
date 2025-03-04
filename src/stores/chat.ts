import { createStore } from "solid-js/store";

export type ChatChannel = 'region' | 'alliance';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  author: string;
  avatar: string;
  channel: ChatChannel;
}

const currentAccountId = 'ba12e291-2e9c-452e-ae06-81c1a885390e';

const transformMessages = (messages: any[], channel: ChatChannel): Message[] => {
  return messages.map((msg) => ({
    id: msg.id,
    text: msg.content,
    sender: msg.author.id === currentAccountId ? 'user' : 'other',
    timestamp: new Date(msg.date_created),
    author: msg.author.name,
    avatar: `/avatars/${msg.author.name.toLowerCase()}.jpg`,
    channel,
  }));
};

export const [chatStore, setChatStore] = createStore({
  messages: [] as Message[],
  activeChannel: 'region' as ChatChannel,
  regionChatId: undefined as string | undefined,
  allianceChatId: undefined as string | undefined,

  setActiveChannel(channel: ChatChannel) {
    setChatStore('activeChannel', channel);
  },

  setChatIds(regionId: string | undefined, allianceId: string | undefined) {
    setChatStore({
      regionChatId: regionId,
      allianceChatId: allianceId,
    });
  },

  addMessage(message: Message) {
    const currentMessages = chatStore.messages;
    const newMessages = [...currentMessages, message];
    if (newMessages.length > 40) {
      // Оставляем только последние 40 сообщений
      setChatStore('messages', newMessages.slice(-40));
    } else {
      setChatStore('messages', newMessages);
    }
  },

  getLastMessages(count: number) {
    return chatStore.messages.slice(-count);
  },

  addMessagesToChannel(channel: ChatChannel, messages: any) {
    setChatStore('messages', (preMessages) => [...preMessages, ...transformMessages(messages, channel)]);
  }
});
