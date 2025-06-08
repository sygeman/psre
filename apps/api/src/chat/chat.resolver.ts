import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Chat, ChatMessage, SendMessageInput } from './chat.types';
import { ChatService } from './chat.service';
import { inngest } from '../lib/inngest';
import { pubSub } from '../lib/pubsub';
import { AccountId } from 'src/account-id.decorator';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Query(() => Chat, { nullable: true })
  chat(@Args('id') id: string) {
    return this.chatService.getChatById(id);
  }

  @Query(() => [ChatMessage])
  chatMessages(
    @Args('chatId') chatId: string,
    @AccountId() accountId: string,
  ): ChatMessage[] {
    return this.chatService.getChatMessages(chatId);
  }

  @Mutation(() => Boolean)
  async createChatMessage(
    @Args('input') input: SendMessageInput,
    @AccountId() accountId: string,
  ) {
    console.log(accountId);
    await inngest.send({
      name: 'chat/message.created',
      data: {
        content: input.content,
        chatId: input.chatId,
        accountId,
      },
    });

    return true;
  }

  @Subscription(() => ChatMessage, {
    filter: (payload, variables, context) => {
      // console.log('filter');
      // console.log(payload, variables, context);
      // payload.commentAdded.title === variables.title,
      return true;
    },
  })
  createdChatMessage(@Args('chatId') chatId: string) {
    return pubSub.asyncIterableIterator('createdChatMessage');
  }
}
