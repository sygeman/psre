import * as Types from '@psre/types';

export type CreateMessageMutationVariables = Types.Exact<{
  input: Types.SendMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createChatMessage?: boolean | null };

export type GetNewChatMessagesSubscriptionVariables = Types.Exact<{
  chatId: Types.Scalars['String']['input'];
}>;


export type GetNewChatMessagesSubscription = { __typename?: 'Subscription', createdChatMessage?: { __typename?: 'ChatMessage', id?: string | null, content?: string | null, accountId?: string | null, chatId?: string | null, createdAt?: any | null } | null };
