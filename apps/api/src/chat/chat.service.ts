import { Injectable } from '@nestjs/common';
import { Chat, ChatMessage, SendMessageInput } from './chat.types';
import { randomUUID } from 'crypto';

@Injectable()
export class ChatService {
  private chats: Map<string, Chat> = new Map();
  private messages: Map<string, ChatMessage[]> = new Map();

  getChatById(id: string): Chat | null {
    const chat = this.chats.get(id);
    if (!chat) return null;

    const messages = this.messages.get(id) || [];
    return {
      ...chat,
      messages,
    };
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
    return message;
  }

  getChatMessages(chatId: string): ChatMessage[] {
    return [];
  }
}
