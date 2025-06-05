import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { MercuriusDriverConfig } from '@nestjs/mercurius';
import { MercuriusDriver } from '@nestjs/mercurius';
import { InngestModule } from '@psre/nestjs-inngest';
import { OrdersModule } from './orders/orders.module';

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
    OrdersModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
