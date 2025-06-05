import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Chat, ChatMessage, SendMessageInput } from './chat.types';
import { ChatService } from './chat.service';
import { pubSub } from '../lib/pubsub';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => ChatMessage)
  async createChatMessage(
    @Args('input') input: SendMessageInput,
  ): Promise<ChatMessage> {
    const message = this.chatService.addMessage(input);

    // // Отправляем сообщение в Inngest
    // await this.chatInngestService.sendMessageSentEvent({
    //   messageId: message.id,
    //   chatId: message.chatId,
    //   content: message.content,
    //   userId: message.userId,
    //   userName: message.userName,
    // });

    await pubSub.publish('createdChatMessage', {
      createdChatMessage: message,
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

  @Subscription(() => ChatMessage, {
    filter: (payload, variables) =>
      payload.createdChatMessage.chatId === variables.chatId,
  })
  createdChatMessage(@Args('chatId') chatId: string) {
    return pubSub.asyncIterableIterator('createdChatMessage');
  }
}
