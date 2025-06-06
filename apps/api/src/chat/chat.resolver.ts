import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Chat, ChatMessage, SendMessageInput } from './chat.types';
import { ChatService } from './chat.service';
import { inngest } from '../lib/inngest';
import { pubSub } from '../lib/pubsub';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => ChatMessage)
  async createChatMessage(
    @Args('input') input: SendMessageInput,
  ): Promise<ChatMessage> {
    const message = this.chatService.addMessage(input);

    await inngest.send({
      name: 'chat/message.created',
      data: {
        id: message.id,
        content: message.content,
        userId: message.userId,
        chatId: message.chatId,
        userName: message.userName,
      },
    });

    return message;
  }

  @Query(() => Chat, { nullable: true })
  chat(@Args('id') id: string): Chat | null {
    return this.chatService.getChatById(id);
  }

  @Query(() => [ChatMessage])
  chatMessages(@Args('chatId') chatId: string): ChatMessage[] {
    return this.chatService.getChatMessages(chatId);
  }

  @Subscription(() => ChatMessage)
  createdChatMessage(@Args('chatId') chatId: string) {
    return pubSub.asyncIterableIterator('createdChatMessage');
  }
}
