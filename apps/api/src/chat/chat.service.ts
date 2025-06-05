import { Injectable } from '@nestjs/common';
import {
  Chat,
  ChatMessage,
  CreateChatInput,
  SendMessageInput,
} from './chat.types';
import { randomUUID } from 'crypto';

@Injectable()
export class ChatService {
  private chats: Map<string, Chat> = new Map();
  private messages: Map<string, ChatMessage[]> = new Map();

  createChat(input: CreateChatInput): Chat {
    const chatId = randomUUID();
    const now = new Date();

    const chat: Chat = {
      id: chatId,
      name: input.name,
      participantIds: input.participantIds,
      messages: [],
      createdAt: now,
      updatedAt: now,
    };

    this.chats.set(chatId, chat);
    this.messages.set(chatId, []);

    return chat;
  }

  getChatById(id: string): Chat | null {
    const chat = this.chats.get(id);
    if (!chat) return null;

    const messages = this.messages.get(id) || [];
    return {
      ...chat,
      messages,
    };
  }

  getUserChats(userId: string): Chat[] {
    const userChats: Chat[] = [];

    for (const chat of this.chats.values()) {
      if (chat.participantIds.includes(userId)) {
        const messages = this.messages.get(chat.id) || [];
        userChats.push({
          ...chat,
          messages,
        });
      }
    }

    return userChats;
  }

  addMessage(input: SendMessageInput): ChatMessage {
    const messageId = randomUUID();
    const message: ChatMessage = {
      id: messageId,
      content: input.content,
      userId: input.userId,
      userName: input.userName,
      chatId: input.chatId,
      createdAt: new Date(),
    };

    const chatMessages = this.messages.get(input.chatId) || [];
    chatMessages.push(message);
    this.messages.set(input.chatId, chatMessages);

    // Обновляем время последнего обновления чата
    const chat = this.chats.get(input.chatId);
    if (chat) {
      chat.updatedAt = new Date();
      this.chats.set(input.chatId, chat);
    }

    return message;
  }

  getChatMessages(chatId: string): ChatMessage[] {
    return this.messages.get(chatId) || [];
  }
}
