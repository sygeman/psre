import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import {
  PlayerResources,
  UpdateResourceInput,
  ResourceUpdate,
} from './resources.types';
import { ResourcesService } from './resources.service';
import { pubSub } from '../lib/pubsub';

@Resolver(() => PlayerResources)
export class ResourcesResolver {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Query(() => PlayerResources, { nullable: true })
  playerResources(@Args('playerId') playerId: string): PlayerResources | null {
    return this.resourcesService.getPlayerResources(playerId);
  }

  @Mutation(() => ResourceUpdate)
  updateResource(@Args('input') input: UpdateResourceInput): ResourceUpdate {
    const result = this.resourcesService.updateResource(input);

    // Публикуем событие для подписчиков
    pubSub.publish('resourceUpdated', {
      resourceUpdated: result,
      playerId: input.playerId,
    });

    return result;
  }

  @Mutation(() => ResourceUpdate)
  addToResource(
    @Args('playerId') playerId: string,
    @Args('resourceType') resourceType: string,
    @Args('amount') amount: number,
  ): ResourceUpdate {
    const result = this.resourcesService.addToResource(
      playerId,
      resourceType,
      amount,
    );

    // Публикуем событие для подписчиков
    pubSub.publish('resourceUpdated', {
      resourceUpdated: result,
      playerId,
    });

    return result;
  }

  @Subscription(() => ResourceUpdate, {
    filter: (payload, variables) => {
      return payload.playerId === variables.playerId;
    },
  })
  resourceUpdated(@Args('playerId') playerId: string) {
    return pubSub.asyncIterableIterator('resourceUpdated');
  }

  @Subscription(() => PlayerResources, {
    filter: (payload, variables) => {
      return payload.playerId === variables.playerId;
    },
  })
  playerResourcesUpdated(@Args('playerId') playerId: string) {
    return pubSub.asyncIterableIterator('playerResourcesUpdated');
  }
}
