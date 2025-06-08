export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Chat = {
  __typename?: 'Chat';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  messages: Array<ChatMessage>;
  name: Scalars['String']['output'];
  participantIds: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  accountId: Scalars['String']['output'];
  chatId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChatMessage: Scalars['Boolean']['output'];
};


export type MutationCreateChatMessageArgs = {
  input: SendMessageInput;
};

export type Query = {
  __typename?: 'Query';
  chat?: Maybe<Chat>;
  chatMessages: Array<ChatMessage>;
};


export type QueryChatArgs = {
  id: Scalars['String']['input'];
};


export type QueryChatMessagesArgs = {
  chatId: Scalars['String']['input'];
};

export type SendMessageInput = {
  chatId: Scalars['String']['input'];
  content: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  createdChatMessage: ChatMessage;
};


export type SubscriptionCreatedChatMessageArgs = {
  chatId: Scalars['String']['input'];
};
