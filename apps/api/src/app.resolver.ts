import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'mercurius';

@Resolver()
export class AppResolver {
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
}
