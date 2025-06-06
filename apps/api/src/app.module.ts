import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ChatModule } from './chat/chat.module';
import { InngestModule } from './inngest/inngest.module';
import { ResourcesModule } from './resources/resources.module';

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
    InngestModule,
    ResourcesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
