import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Chat, ChatMessage, SendMessageInput } from './chat.types';
import { ChatService } from './chat.service';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

// Тестовые данные для демонстрации
const testMessages = [
  'Привет всем!',
  'Как дела?',
  'Кто-нибудь видел последние новости?',
  'Отличная погода сегодня!',
  'Не забудьте про встречу в 15:00',
  'Кто идет на обед?',
  'Интересная статья в блоге компании',
  'Поздравляю с успешным запуском!',
  'Нужна помощь с проектом',
  'Спасибо за отличную работу!',
];

const testUsers = [
  { id: 'user_1', name: 'Алекс' },
  { id: 'user_2', name: 'Мария' },
  { id: 'user_3', name: 'Дмитрий' },
  { id: 'user_4', name: 'Анна' },
  { id: 'user_5', name: 'Сергей' },
];

let messageCounter = 1;

setInterval(() => {
  const randomMessage =
    testMessages[Math.floor(Math.random() * testMessages.length)];
  const randomUser = testUsers[Math.floor(Math.random() * testUsers.length)];

  pubSub.publish('createdChatMessage', {
    createdChatMessage: {
      id: `msg_${messageCounter++}_${Date.now()}`,
      chatId: '1',
      content: randomMessage,
      userId: randomUser.id,
      userName: randomUser.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}, 100);

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => ChatMessage)
  async createChatMessage(
    @Args('input') input: SendMessageInput,
  ): Promise<ChatMessage> {
    const message = this.chatService.addMessage(input);

    // // Отправляем сообщение в Inngest
    // await this.chatInngestService.sendMessageSentEvent({
    //   messageId: message.id,
    //   chatId: message.chatId,
    //   content: message.content,
    //   userId: message.userId,
    //   userName: message.userName,
    // });

    await pubSub.publish('createdChatMessage', {
      createdChatMessage: message,
    });

    return message;
  }

  @Query(() => Chat, { nullable: true })
  chat(@Args('id') id: string): Chat | null {
    return this.chatService.getChatById(id);
  }

  @Query(() => [Chat])
  chatUsers(@Args('userId') userId: string): Chat[] {
    return this.chatService.getUserChats(userId);
  }

  @Query(() => [ChatMessage])
  chatMessages(@Args('chatId') chatId: string): ChatMessage[] {
    return this.chatService.getChatMessages(chatId);
  }

  @Subscription(() => ChatMessage)
  createdChatMessage(@Args('chatId') chatId: string) {
    // В реальном приложении здесь должна быть фильтрация по chatId
    console.log(`Подписка на сообщения чата: ${chatId}`);
    return pubSub.asyncIterableIterator('createdChatMessage');
  }
}
