import { Resolver, Query, Mutation, Subscription, Arg, Root } from 'type-graphql';
import { Chat, ChatMessage, SendMessageInput } from './chat.types';

@Resolver(() => Chat)
export class ChatResolver {
  @Query(() => [ChatMessage])
  chatMessages(
    @Arg('chatId') chatId: string,
  ): ChatMessage[] {
    return [];
  }

  @Mutation(() => Boolean)
  async createChatMessage(
    @Arg('input') input: SendMessageInput,
  ) {
    return true;
  }

  @Subscription(() => ChatMessage, {
    topics: 'createdChatMessage'
  })
  createdChatMessage(@Root() newChatMessage: ChatMessage, @Arg('chatId') chatId: string) {
    return newChatMessage;
  }
}
