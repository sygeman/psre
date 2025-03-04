import { createSignal } from 'solid-js';
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

export const chatStore = {
  messages: [] as Message[],
  activeChannel: 'region' as ChatChannel,
  autoMessageInterval: undefined as ReturnType<typeof setInterval> | undefined,
  regionChatId: undefined as string | undefined,
  allianceChatId: undefined as string | undefined,

  setActiveChannel(channel: ChatChannel) {
    this.activeChannel = channel;
  },

  setChatIds(regionId: string | undefined, allianceId: string | undefined) {
    this.regionChatId = regionId;
    this.allianceChatId = allianceId;
  },

  addMessage(message: Message) {
    const newMessages = [...this.messages, message];
    if (newMessages.length > 40) {
      // Оставляем только последние 40 сообщений
      this.messages = newMessages.slice(-40);
    } else {
      this.messages = newMessages;
    }
  },

  getLastMessages(count: number) {
    return this.messages.slice(-count);
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

    this.addMessage(message);
  },

  startAutoMessages() {
    if (!this.autoMessageInterval) {
      this.autoMessageInterval = setInterval(() => this.sendAutoMessage(), 3000);
    }
  },

  stopAutoMessages() {
    if (this.autoMessageInterval) {
      clearInterval(this.autoMessageInterval);
      this.autoMessageInterval = undefined;
    }
  },

  initializeMockMessages() {
    this.messages = mockMessages;
    this.startAutoMessages();
  },
};
