import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Chat, ChatMessage, SendMessageInput } from './chat.types';
import { ChatService } from './chat.service';
import { inngest } from '../lib/inngest';
import { pubSub } from '../lib/pubsub';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => Chat, { nullable: true })
  chat(@Args('id') id: string): Chat | null {
    return this.chatService.getChatById(id);
  }

  @Query(() => [ChatMessage])
  chatMessages(@Args('chatId') chatId: string): ChatMessage[] {
    return this.chatService.getChatMessages(chatId);
  }

  @Mutation(() => Boolean)
  async createChatMessage(@Args('input') input: SendMessageInput) {
    await inngest.send({
      name: 'chat/message.created',
      data: {
        content: input.content,
        userId: input.userId,
        chatId: input.chatId,
        userName: input.userName,
      },
    });

    return true;
  }

  @Subscription(() => ChatMessage)
  createdChatMessage(@Args('chatId') chatId: string) {
    return pubSub.asyncIterableIterator('createdChatMessage');
  }
}
