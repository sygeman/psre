import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { MercuriusDriverConfig } from '@nestjs/mercurius';
import { MercuriusDriver } from '@nestjs/mercurius';
import { InngestModule } from './inngest/inngest.module';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      autoSchemaFile: 'schema.gql',
      subscription: {
        fullWsTransport: true,
      },
      graphiql: true,
    }),
    InngestModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
