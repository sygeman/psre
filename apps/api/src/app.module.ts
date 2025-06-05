import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ChatModule } from './chat/chat.module';
import { pubSub } from './lib/pubsub';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': true,
      },
      playground: true,
    }),
    ChatModule,
  ],
  providers: [],
})
export class AppModule {
  onApplicationBootstrap() {
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
      const randomUser =
        testUsers[Math.floor(Math.random() * testUsers.length)];

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
  }
}
