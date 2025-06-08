import * as Types from '@/types/gql.types';

export type GetChatMessagesQueryVariables = Types.Exact<{
  chatId: Types.Scalars['String']['input'];
}>;


export type GetChatMessagesQuery = { __typename?: 'Query', chatMessages: Array<{ __typename?: 'ChatMessage', id: string, content: string, userId: string, userName: string, chatId: string, createdAt: any }> };
