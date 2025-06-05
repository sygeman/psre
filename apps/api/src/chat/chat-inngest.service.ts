import { Injectable } from '@nestjs/common';
import { Inngest } from 'inngest';

@Injectable()
export class ChatInngestService {
  private inngest: Inngest;

  constructor() {
    this.inngest = new Inngest({ id: 'chat-service' });
  }

  async sendChatCreatedEvent(data: {
    chatId: string;
    name: string;
    participantIds: string[];
  }): Promise<void> {
    await this.inngest.send({
      name: 'chat/chat.created',
      data,
    });
  }

  async sendMessageSentEvent(data: {
    messageId: string;
    chatId: string;
    content: string;
    userId: string;
    userName: string;
  }): Promise<void> {
    await this.inngest.send({
      name: 'chat/message.sent',
      data,
    });
  }

  async sendUserActivityEvent(data: {
    userId: string;
    chatId: string;
    action: 'typing' | 'online' | 'offline';
  }): Promise<void> {
    await this.inngest.send({
      name: 'chat/user.activity',
      data,
    });
  }
}
