import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'mercurius';
import { InngestService } from './inngest/inngest.service';

@Resolver()
export class AppResolver {
  constructor(private readonly inngestService: InngestService) {}
  @Query(() => [String])
  comments(): string[] {
    return [];
  }

  @Mutation(() => String)
  addComment(
    @Args('comment', { type: () => String }) comment: string,
    @Context('pubsub') pubSub: PubSub,
  ) {
    pubSub.publish({
      topic: 'commentAdded',
      payload: {
        commentAdded: comment,
      },
    });
    return comment;
  }

  @Subscription(() => String)
  commentAdded(@Context('pubsub') pubSub: PubSub) {
    return pubSub.subscribe('commentAdded');
  }

  @Mutation(() => String)
  async createUser(
    @Args('email', { type: () => String }) email: string,
    @Args('userId', { type: () => String }) userId: string,
  ) {
    // Отправляем событие в Inngest
    await this.inngestService.send('user/created', {
      userId,
      email,
    });

    return `Пользователь создан: ${email}`;
  }
}
