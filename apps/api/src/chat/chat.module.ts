import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { ChatController } from './chat.controller';
import { ChatInngestService } from './chat-inngest.service';

@Module({
  providers: [ChatService, ChatResolver, ChatInngestService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
