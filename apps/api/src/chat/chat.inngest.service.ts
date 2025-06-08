import { Injectable } from '@nestjs/common';
import { pubSub } from '../lib/pubsub';
import { InngestFunction, InngestTrigger, InngestContext } from '../inngest';
import { CHAT_EVENTS, CHAT_FUNCTION_IDS } from './chat.events';
import { ChatService } from './chat.service';

interface ChatMessageData {
  id: string;
  chatId: string;
  content: string;
  accountId: string;
}

@Injectable()
export class ChatInngestService {
  constructor(private readonly chatService: ChatService) {}

  @InngestFunction({ id: CHAT_FUNCTION_IDS.MESSAGE_HANDLER })
  @InngestTrigger({ event: CHAT_EVENTS.MESSAGE_CREATED })
  async handleMessageCreated({ event, step }: InngestContext<ChatMessageData>) {
    const data = event.data;

    const message = await step.run('create-message-event', () => {
      return this.chatService.createMessage(data);
    });

    await step.run('publish-message-event', async () => {
      const createdChatMessage = {
        ...message,
        createdAt: new Date(message.createdAt),
      };

      await pubSub.publish('createdChatMessage', { createdChatMessage });
    });

    return { success: true };
  }
}
