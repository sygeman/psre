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

  createMessage(input: SendMessageInput & { accountId: string }): ChatMessage {
    const messageId = randomUUID();
    const message: ChatMessage = {
      id: messageId,
      content: input.content,
      chatId: input.chatId,
      accountId: input.accountId,
      createdAt: new Date(),
    };
    return message;
  }

  getChatMessages(chatId: string): ChatMessage[] {
    return [];
  }
}
