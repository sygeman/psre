import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { ChatInngestService } from './chat.inngest.service';

@Module({
  providers: [ChatService, ChatResolver, ChatInngestService],
  exports: [ChatService],
})
export class ChatModule {}
