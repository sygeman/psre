import * as Types from '@/types';

export type ChatMessageFragmentFragment = { __typename?: 'ChatMessage', id?: string | null, content?: string | null, createdAt?: any | null, author?: { __typename?: 'ChatMessageAuthor', id?: string | null, name?: string | null } | null };

export type GetChatsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'Query', chats?: Array<{ __typename?: 'Chat', id?: string | null, type?: string | null, messages?: Array<{ __typename?: 'ChatMessage', id?: string | null, content?: string | null, createdAt?: any | null, author?: { __typename?: 'ChatMessageAuthor', id?: string | null, name?: string | null } | null }> | null }> | null };

export type CreateMessageMutationVariables = Types.Exact<{
  input: Types.SendMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createChatMessage?: boolean | null };

export type GetNewChatMessagesSubscriptionVariables = Types.Exact<{
  chatId: Types.Scalars['String']['input'];
}>;


export type GetNewChatMessagesSubscription = { __typename?: 'Subscription', createdChatMessage?: { __typename?: 'ChatMessage', id?: string | null, content?: string | null, createdAt?: any | null, author?: { __typename?: 'ChatMessageAuthor', id?: string | null, name?: string | null } | null } | null };

export type ChatCleanupSubscriptionVariables = Types.Exact<{
  chatId: Types.Scalars['String']['input'];
}>;


export type ChatCleanupSubscription = { __typename?: 'Subscription', chatCleanup?: boolean | null };
