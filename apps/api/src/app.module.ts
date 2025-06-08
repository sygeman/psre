import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ChatModule } from './chat/chat.module';
import { InngestModule } from './inngest/inngest.module';
import { type Context } from 'graphql-ws';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': {
          onConnect: (context: Context<{ sessionId: string }>) => {
            (context.extra as { user: { accountId: string } }).user = {
              accountId: 'ba12e291-2e9c-452e-ae06-81c1a885390e',
            };
          },
        },
      },
      playground: true,
    }),
    ChatModule,
    InngestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
