import { Controller, Injectable } from '@nestjs/common';
import {
  InngestFunction,
  InngestTrigger,
  InngestContext,
} from '@psre/nestjs-inngest';

@Injectable()
@Controller('chat')
export class ChatController {
  @InngestFunction({ id: 'chat-created-handler' })
  @InngestTrigger({ event: 'chat/chat.created' })
  async handleChatCreated(
    context: InngestContext<{
      chatId: string;
      name: string;
      participantIds: string[];
    }>,
  ) {
    const { event, step } = context;

    // Шаг 1: Логирование создания чата
    await step.run('log-chat-creation', () => {
      console.log('Новый чат создан:', event.data);
      return { logged: true };
    });

    // Шаг 2: Уведомление участников
    await step.run('notify-participants', () => {
      console.log(
        `Уведомление участников чата ${event.data.chatId}:`,
        event.data.participantIds,
      );
      return { notified: true };
    });

    // Шаг 3: Создание системного сообщения
    await step.run('create-system-message', () => {
      console.log(
        `Создание системного сообщения для чата ${event.data.chatId}`,
      );
      return { systemMessageCreated: true };
    });

    return { success: true };
  }

  @InngestFunction({ id: 'message-sent-handler' })
  @InngestTrigger({ event: 'chat/message.sent' })
  async handleMessageSent(
    context: InngestContext<{
      messageId: string;
      chatId: string;
      content: string;
      userId: string;
      userName: string;
    }>,
  ) {
    const { event, step } = context;

    // Шаг 1: Обработка сообщения
    await step.run('process-message', () => {
      console.log('Новое сообщение:', event.data);
      return { processed: true };
    });

    // Шаг 2: Проверка контента (модерация)
    await step.run('moderate-content', () => {
      console.log(
        `Модерация сообщения ${event.data.messageId}: "${event.data.content}"`,
      );
      return { moderated: true, approved: true };
    });

    // Шаг 3: Уведомление участников чата
    await step.run('notify-chat-participants', () => {
      console.log(
        `Уведомление участников чата ${event.data.chatId} о новом сообщении от ${event.data.userName}`,
      );
      return { participantsNotified: true };
    });

    // Шаг 4: Сохранение в поиск/индексирование
    await step.run('index-message', () => {
      console.log(
        `Индексирование сообщения ${event.data.messageId} для поиска`,
      );
      return { indexed: true };
    });

    return { success: true };
  }

  @InngestFunction({ id: 'chat-activity-tracker' })
  @InngestTrigger({ event: 'chat/user.activity' })
  async handleUserActivity(
    context: InngestContext<{
      userId: string;
      chatId: string;
      action: 'typing' | 'online' | 'offline';
    }>,
  ) {
    const { event, step } = context;

    await step.run('track-activity', () => {
      console.log(
        `Пользователь ${event.data.userId} в чате ${event.data.chatId}: ${event.data.action}`,
      );
      return { tracked: true };
    });

    return { success: true };
  }
}
