import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@ObjectType()
export class ChatMessage {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field()
  userId: string;

  @Field()
  userName: string;

  @Field()
  chatId: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class Chat {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [String])
  participantIds: string[];

  @Field(() => [ChatMessage])
  messages: ChatMessage[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateChatInput {
  @Field()
  name: string;

  @Field(() => [String])
  participantIds: string[];
}

@InputType()
export class SendMessageInput {
  @Field()
  chatId: string;

  @Field()
  content: string;

  @Field()
  userId: string;

  @Field()
  userName: string;
}
