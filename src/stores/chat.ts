import { createStore } from "solid-js/store";
import { mockMessages, autoMessages, authors } from '@/mocks/chat';

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

export const [chatStore, setChatStore] = createStore({
  messages: [] as Message[],
  activeChannel: 'region' as ChatChannel,
  autoMessageInterval: undefined as ReturnType<typeof setInterval> | undefined,
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

  sendAutoMessage() {
    const randomMessage = autoMessages[Math.floor(Math.random() * autoMessages.length)];
    const channels: ChatChannel[] = ['region', 'alliance'];
    const randomChannel = channels[Math.floor(Math.random() * channels.length)];

    const randomAuthor =
      authors[randomChannel][
        Math.floor(Math.random() * authors[randomChannel].length)
      ];

    const message: Message = {
      id: Date.now().toString(),
      text: randomMessage,
      sender: 'other',
      timestamp: new Date(),
      author: randomAuthor,
      avatar: `/avatars/${randomAuthor.toLowerCase()}.jpg`,
      channel: randomChannel,
    };

    chatStore.addMessage(message);
  },

  startAutoMessages() {
    if (!chatStore.autoMessageInterval) {
      setChatStore('autoMessageInterval', setInterval(() => chatStore.sendAutoMessage(), 3000));
    }
  },

  stopAutoMessages() {
    if (chatStore.autoMessageInterval) {
      clearInterval(chatStore.autoMessageInterval);
      setChatStore('autoMessageInterval', undefined);
    }
  },

  initializeMockMessages() {
    setChatStore('messages', mockMessages);
    chatStore.startAutoMessages();
  },
});
