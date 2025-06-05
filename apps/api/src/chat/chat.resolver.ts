import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Chat, ChatMessage, SendMessageInput } from './chat.types';
import { ChatService } from './chat.service';
import { ChatInngestService } from './chat-inngest.service';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatInngestService: ChatInngestService,
  ) {}

  @Mutation(() => ChatMessage)
  async createChatMessage(
    @Args('input') input: SendMessageInput,
  ): Promise<ChatMessage> {
    const message = this.chatService.addMessage(input);

    // Отправляем событие через Inngest
    await this.chatInngestService.sendMessageSentEvent({
      messageId: message.id,
      chatId: message.chatId,
      content: message.content,
      userId: message.userId,
      userName: message.userName,
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
}
