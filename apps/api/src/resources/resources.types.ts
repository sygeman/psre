import { ObjectType, Field, ID, InputType, Int } from '@nestjs/graphql';

@ObjectType()
export class Resource {
  @Field(() => ID)
  id: string;

  @Field()
  type: string; // 'food', 'wood', 'steel', 'fuel', 'diamond', 'vaccine'

  @Field()
  icon: string;

  @Field()
  name: string;

  @Field(() => Int)
  amount: number;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class PlayerResources {
  @Field(() => ID)
  playerId: string;

  @Field(() => [Resource])
  resources: Resource[];

  @Field()
  updatedAt: Date;
}

@InputType()
export class UpdateResourceInput {
  @Field()
  playerId: string;

  @Field()
  resourceType: string;

  @Field(() => Int)
  amount: number;
}

@ObjectType()
export class ResourceUpdate {
  @Field(() => ID)
  playerId: string;

  @Field()
  resourceType: string;

  @Field(() => Int)
  oldAmount: number;

  @Field(() => Int)
  newAmount: number;

  @Field()
  updatedAt: Date;
}
