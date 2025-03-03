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
  Date: { input: string; output: string; }
  GraphQLBigInt: { input: any; output: any; }
  GraphQLStringOrFloat: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type EventEnum =
  | 'create'
  | 'delete'
  | 'update';

export type Mutation = {
  update_psre_account_state_batch: Array<Psre_Account_State>;
  update_psre_account_state_item?: Maybe<Psre_Account_State>;
  update_psre_account_state_items: Array<Psre_Account_State>;
};


export type MutationUpdate_Psre_Account_State_BatchArgs = {
  data?: InputMaybe<Array<Update_Psre_Account_State_Input>>;
  filter?: InputMaybe<Psre_Account_State_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type MutationUpdate_Psre_Account_State_ItemArgs = {
  data: Update_Psre_Account_State_Input;
  id: Scalars['ID']['input'];
};


export type MutationUpdate_Psre_Account_State_ItemsArgs = {
  data: Update_Psre_Account_State_Input;
  filter?: InputMaybe<Psre_Account_State_Filter>;
  ids: Array<InputMaybe<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Query = {
  psre_account: Array<Psre_Account>;
  psre_account_aggregated: Array<Psre_Account_Aggregated>;
  psre_account_by_id?: Maybe<Psre_Account>;
  psre_account_by_version?: Maybe<Version_Psre_Account>;
  psre_account_heroes: Array<Psre_Account_Heroes>;
  psre_account_heroes_aggregated: Array<Psre_Account_Heroes_Aggregated>;
  psre_account_heroes_by_id?: Maybe<Psre_Account_Heroes>;
  psre_account_heroes_by_version?: Maybe<Version_Psre_Account_Heroes>;
  psre_account_state: Array<Psre_Account_State>;
  psre_account_state_aggregated: Array<Psre_Account_State_Aggregated>;
  psre_account_state_by_id?: Maybe<Psre_Account_State>;
  psre_account_state_by_version?: Maybe<Version_Psre_Account_State>;
  psre_alliances: Array<Psre_Alliances>;
  psre_alliances_aggregated: Array<Psre_Alliances_Aggregated>;
  psre_alliances_by_id?: Maybe<Psre_Alliances>;
  psre_alliances_by_version?: Maybe<Version_Psre_Alliances>;
  psre_chat_message: Array<Psre_Chat_Message>;
  psre_chat_message_aggregated: Array<Psre_Chat_Message_Aggregated>;
  psre_chat_message_by_id?: Maybe<Psre_Chat_Message>;
  psre_chat_message_by_version?: Maybe<Version_Psre_Chat_Message>;
  psre_chats: Array<Psre_Chats>;
  psre_chats_aggregated: Array<Psre_Chats_Aggregated>;
  psre_chats_by_id?: Maybe<Psre_Chats>;
  psre_chats_by_version?: Maybe<Version_Psre_Chats>;
  psre_heroes: Array<Psre_Heroes>;
  psre_heroes_aggregated: Array<Psre_Heroes_Aggregated>;
  psre_heroes_by_id?: Maybe<Psre_Heroes>;
  psre_heroes_by_version?: Maybe<Version_Psre_Heroes>;
  psre_regions: Array<Psre_Regions>;
  psre_regions_aggregated: Array<Psre_Regions_Aggregated>;
  psre_regions_by_id?: Maybe<Psre_Regions>;
  psre_regions_by_version?: Maybe<Version_Psre_Regions>;
};


export type QueryPsre_AccountArgs = {
  filter?: InputMaybe<Psre_Account_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Account_AggregatedArgs = {
  filter?: InputMaybe<Psre_Account_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Account_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPsre_Account_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryPsre_Account_HeroesArgs = {
  filter?: InputMaybe<Psre_Account_Heroes_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Account_Heroes_AggregatedArgs = {
  filter?: InputMaybe<Psre_Account_Heroes_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Account_Heroes_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPsre_Account_Heroes_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryPsre_Account_StateArgs = {
  filter?: InputMaybe<Psre_Account_State_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Account_State_AggregatedArgs = {
  filter?: InputMaybe<Psre_Account_State_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Account_State_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPsre_Account_State_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryPsre_AlliancesArgs = {
  filter?: InputMaybe<Psre_Alliances_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Alliances_AggregatedArgs = {
  filter?: InputMaybe<Psre_Alliances_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Alliances_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPsre_Alliances_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryPsre_Chat_MessageArgs = {
  filter?: InputMaybe<Psre_Chat_Message_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Chat_Message_AggregatedArgs = {
  filter?: InputMaybe<Psre_Chat_Message_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Chat_Message_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPsre_Chat_Message_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryPsre_ChatsArgs = {
  filter?: InputMaybe<Psre_Chats_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Chats_AggregatedArgs = {
  filter?: InputMaybe<Psre_Chats_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Chats_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPsre_Chats_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryPsre_HeroesArgs = {
  filter?: InputMaybe<Psre_Heroes_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Heroes_AggregatedArgs = {
  filter?: InputMaybe<Psre_Heroes_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Heroes_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPsre_Heroes_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};


export type QueryPsre_RegionsArgs = {
  filter?: InputMaybe<Psre_Regions_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Regions_AggregatedArgs = {
  filter?: InputMaybe<Psre_Regions_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type QueryPsre_Regions_By_IdArgs = {
  id: Scalars['ID']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPsre_Regions_By_VersionArgs = {
  id: Scalars['ID']['input'];
  version: Scalars['String']['input'];
};

export type Subscription = {
  psre_account_heroes_mutated?: Maybe<Psre_Account_Heroes_Mutated>;
  psre_account_mutated?: Maybe<Psre_Account_Mutated>;
  psre_account_state_mutated?: Maybe<Psre_Account_State_Mutated>;
  psre_alliances_mutated?: Maybe<Psre_Alliances_Mutated>;
  psre_chat_message_mutated?: Maybe<Psre_Chat_Message_Mutated>;
  psre_chats_mutated?: Maybe<Psre_Chats_Mutated>;
  psre_heroes_mutated?: Maybe<Psre_Heroes_Mutated>;
  psre_regions_mutated?: Maybe<Psre_Regions_Mutated>;
};


export type SubscriptionPsre_Account_Heroes_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPsre_Account_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPsre_Account_State_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPsre_Alliances_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPsre_Chat_Message_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPsre_Chats_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPsre_Heroes_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};


export type SubscriptionPsre_Regions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type Big_Int_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLBigInt']['input']>>>;
  _eq?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  _gt?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  _gte?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['GraphQLBigInt']['input']>>>;
  _lt?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  _lte?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLBigInt']['input']>>>;
  _neq?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['GraphQLBigInt']['input']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Count_Function_Filter_Operators = {
  count?: InputMaybe<Number_Filter_Operators>;
};

export type Count_Functions = {
  count?: Maybe<Scalars['Int']['output']>;
};

export type Date_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Datetime_Function_Filter_Operators = {
  day?: InputMaybe<Number_Filter_Operators>;
  hour?: InputMaybe<Number_Filter_Operators>;
  minute?: InputMaybe<Number_Filter_Operators>;
  month?: InputMaybe<Number_Filter_Operators>;
  second?: InputMaybe<Number_Filter_Operators>;
  week?: InputMaybe<Number_Filter_Operators>;
  weekday?: InputMaybe<Number_Filter_Operators>;
  year?: InputMaybe<Number_Filter_Operators>;
};

export type Datetime_Functions = {
  day?: Maybe<Scalars['Int']['output']>;
  hour?: Maybe<Scalars['Int']['output']>;
  minute?: Maybe<Scalars['Int']['output']>;
  month?: Maybe<Scalars['Int']['output']>;
  second?: Maybe<Scalars['Int']['output']>;
  week?: Maybe<Scalars['Int']['output']>;
  weekday?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type Number_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _eq?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _gt?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _gte?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _lt?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _lte?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _neq?: InputMaybe<Scalars['GraphQLStringOrFloat']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']['input']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Psre_Account = {
  alliance_id?: Maybe<Psre_Alliances>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  region_id?: Maybe<Psre_Regions>;
  state?: Maybe<Array<Maybe<Psre_Account_State>>>;
  state_func?: Maybe<Count_Functions>;
  user?: Maybe<Scalars['String']['output']>;
  user_func?: Maybe<Count_Functions>;
};


export type Psre_AccountAlliance_IdArgs = {
  filter?: InputMaybe<Psre_Alliances_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Psre_AccountRegion_IdArgs = {
  filter?: InputMaybe<Psre_Regions_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Psre_AccountStateArgs = {
  filter?: InputMaybe<Psre_Account_State_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Psre_Account_Aggregated = {
  count?: Maybe<Psre_Account_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Psre_Account_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
};

export type Psre_Account_Aggregated_Count = {
  alliance_id?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  region_id?: Maybe<Scalars['Int']['output']>;
  state?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<Scalars['Int']['output']>;
};

export type Psre_Account_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Psre_Account_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Psre_Account_Filter>>>;
  alliance_id?: InputMaybe<Psre_Alliances_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  region_id?: InputMaybe<Psre_Regions_Filter>;
  state?: InputMaybe<Psre_Account_State_Filter>;
  state_func?: InputMaybe<Count_Function_Filter_Operators>;
  user?: InputMaybe<String_Filter_Operators>;
  user_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Psre_Account_Heroes = {
  account_id?: Maybe<Psre_Account>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  hero?: Maybe<Psre_Heroes>;
  id: Scalars['ID']['output'];
};


export type Psre_Account_HeroesAccount_IdArgs = {
  filter?: InputMaybe<Psre_Account_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Psre_Account_HeroesHeroArgs = {
  filter?: InputMaybe<Psre_Heroes_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Psre_Account_Heroes_Aggregated = {
  count?: Maybe<Psre_Account_Heroes_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Psre_Account_Heroes_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
};

export type Psre_Account_Heroes_Aggregated_Count = {
  account_id?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  hero?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type Psre_Account_Heroes_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Psre_Account_Heroes_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Psre_Account_Heroes_Filter>>>;
  account_id?: InputMaybe<Psre_Account_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  hero?: InputMaybe<Psre_Heroes_Filter>;
  id?: InputMaybe<String_Filter_Operators>;
};

export type Psre_Account_Heroes_Mutated = {
  data?: Maybe<Psre_Account_Heroes>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Psre_Account_Mutated = {
  data?: Maybe<Psre_Account>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Psre_Account_State = {
  account_id?: Maybe<Psre_Account>;
  action_points?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  diamond?: Maybe<Scalars['GraphQLBigInt']['output']>;
  exp?: Maybe<Scalars['GraphQLBigInt']['output']>;
  food?: Maybe<Scalars['GraphQLBigInt']['output']>;
  fuel?: Maybe<Scalars['GraphQLBigInt']['output']>;
  id: Scalars['ID']['output'];
  level?: Maybe<Scalars['Int']['output']>;
  power?: Maybe<Scalars['GraphQLBigInt']['output']>;
  serum?: Maybe<Scalars['GraphQLBigInt']['output']>;
  stamina_points?: Maybe<Scalars['Int']['output']>;
  steel?: Maybe<Scalars['GraphQLBigInt']['output']>;
  wood?: Maybe<Scalars['GraphQLBigInt']['output']>;
};


export type Psre_Account_StateAccount_IdArgs = {
  filter?: InputMaybe<Psre_Account_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Psre_Account_State_Aggregated = {
  avg?: Maybe<Psre_Account_State_Aggregated_Fields>;
  avgDistinct?: Maybe<Psre_Account_State_Aggregated_Fields>;
  count?: Maybe<Psre_Account_State_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Psre_Account_State_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Psre_Account_State_Aggregated_Fields>;
  min?: Maybe<Psre_Account_State_Aggregated_Fields>;
  sum?: Maybe<Psre_Account_State_Aggregated_Fields>;
  sumDistinct?: Maybe<Psre_Account_State_Aggregated_Fields>;
};

export type Psre_Account_State_Aggregated_Count = {
  account_id?: Maybe<Scalars['Int']['output']>;
  action_points?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  diamond?: Maybe<Scalars['Int']['output']>;
  exp?: Maybe<Scalars['Int']['output']>;
  food?: Maybe<Scalars['Int']['output']>;
  fuel?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
  power?: Maybe<Scalars['Int']['output']>;
  serum?: Maybe<Scalars['Int']['output']>;
  stamina_points?: Maybe<Scalars['Int']['output']>;
  steel?: Maybe<Scalars['Int']['output']>;
  wood?: Maybe<Scalars['Int']['output']>;
};

export type Psre_Account_State_Aggregated_Fields = {
  action_points?: Maybe<Scalars['Float']['output']>;
  diamond?: Maybe<Scalars['Float']['output']>;
  exp?: Maybe<Scalars['Float']['output']>;
  food?: Maybe<Scalars['Float']['output']>;
  fuel?: Maybe<Scalars['Float']['output']>;
  level?: Maybe<Scalars['Float']['output']>;
  power?: Maybe<Scalars['Float']['output']>;
  serum?: Maybe<Scalars['Float']['output']>;
  stamina_points?: Maybe<Scalars['Float']['output']>;
  steel?: Maybe<Scalars['Float']['output']>;
  wood?: Maybe<Scalars['Float']['output']>;
};

export type Psre_Account_State_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Psre_Account_State_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Psre_Account_State_Filter>>>;
  account_id?: InputMaybe<Psre_Account_Filter>;
  action_points?: InputMaybe<Number_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  diamond?: InputMaybe<Big_Int_Filter_Operators>;
  exp?: InputMaybe<Big_Int_Filter_Operators>;
  food?: InputMaybe<Big_Int_Filter_Operators>;
  fuel?: InputMaybe<Big_Int_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  level?: InputMaybe<Number_Filter_Operators>;
  power?: InputMaybe<Big_Int_Filter_Operators>;
  serum?: InputMaybe<Big_Int_Filter_Operators>;
  stamina_points?: InputMaybe<Number_Filter_Operators>;
  steel?: InputMaybe<Big_Int_Filter_Operators>;
  wood?: InputMaybe<Big_Int_Filter_Operators>;
};

export type Psre_Account_State_Mutated = {
  data?: Maybe<Psre_Account_State>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Psre_Alliances = {
  chat_id?: Maybe<Psre_Chats>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  region_id?: Maybe<Psre_Regions>;
};


export type Psre_AlliancesChat_IdArgs = {
  filter?: InputMaybe<Psre_Chats_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type Psre_AlliancesRegion_IdArgs = {
  filter?: InputMaybe<Psre_Regions_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Psre_Alliances_Aggregated = {
  count?: Maybe<Psre_Alliances_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Psre_Alliances_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
};

export type Psre_Alliances_Aggregated_Count = {
  chat_id?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  region_id?: Maybe<Scalars['Int']['output']>;
};

export type Psre_Alliances_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Psre_Alliances_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Psre_Alliances_Filter>>>;
  chat_id?: InputMaybe<Psre_Chats_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  region_id?: InputMaybe<Psre_Regions_Filter>;
};

export type Psre_Alliances_Mutated = {
  data?: Maybe<Psre_Alliances>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Psre_Chat_Message = {
  chat_id?: Maybe<Psre_Chats>;
  content?: Maybe<Scalars['String']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
};


export type Psre_Chat_MessageChat_IdArgs = {
  filter?: InputMaybe<Psre_Chats_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Psre_Chat_Message_Aggregated = {
  count?: Maybe<Psre_Chat_Message_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Psre_Chat_Message_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
};

export type Psre_Chat_Message_Aggregated_Count = {
  chat_id?: Maybe<Scalars['Int']['output']>;
  content?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type Psre_Chat_Message_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Psre_Chat_Message_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Psre_Chat_Message_Filter>>>;
  chat_id?: InputMaybe<Psre_Chats_Filter>;
  content?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
};

export type Psre_Chat_Message_Mutated = {
  data?: Maybe<Psre_Chat_Message>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Psre_Chats = {
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type Psre_Chats_Aggregated = {
  count?: Maybe<Psre_Chats_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Psre_Chats_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
};

export type Psre_Chats_Aggregated_Count = {
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
};

export type Psre_Chats_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Psre_Chats_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Psre_Chats_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
};

export type Psre_Chats_Mutated = {
  data?: Maybe<Psre_Chats>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Psre_Heroes = {
  atk: Scalars['Int']['output'];
  base_stars?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  def?: Maybe<Scalars['Int']['output']>;
  hp?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  style?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Psre_Heroes_Aggregated = {
  avg?: Maybe<Psre_Heroes_Aggregated_Fields>;
  avgDistinct?: Maybe<Psre_Heroes_Aggregated_Fields>;
  count?: Maybe<Psre_Heroes_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Psre_Heroes_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
  max?: Maybe<Psre_Heroes_Aggregated_Fields>;
  min?: Maybe<Psre_Heroes_Aggregated_Fields>;
  sum?: Maybe<Psre_Heroes_Aggregated_Fields>;
  sumDistinct?: Maybe<Psre_Heroes_Aggregated_Fields>;
};

export type Psre_Heroes_Aggregated_Count = {
  atk?: Maybe<Scalars['Int']['output']>;
  base_stars?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  def?: Maybe<Scalars['Int']['output']>;
  hp?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
  style?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['Int']['output']>;
};

export type Psre_Heroes_Aggregated_Fields = {
  atk?: Maybe<Scalars['Float']['output']>;
  base_stars?: Maybe<Scalars['Float']['output']>;
  def?: Maybe<Scalars['Float']['output']>;
  hp?: Maybe<Scalars['Float']['output']>;
};

export type Psre_Heroes_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Psre_Heroes_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Psre_Heroes_Filter>>>;
  atk?: InputMaybe<Number_Filter_Operators>;
  base_stars?: InputMaybe<Number_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  def?: InputMaybe<Number_Filter_Operators>;
  hp?: InputMaybe<Number_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  style?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
};

export type Psre_Heroes_Mutated = {
  data?: Maybe<Psre_Heroes>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type Psre_Regions = {
  chat_id?: Maybe<Psre_Chats>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};


export type Psre_RegionsChat_IdArgs = {
  filter?: InputMaybe<Psre_Chats_Filter>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Psre_Regions_Aggregated = {
  count?: Maybe<Psre_Regions_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']['output']>;
  countDistinct?: Maybe<Psre_Regions_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']['output']>;
};

export type Psre_Regions_Aggregated_Count = {
  chat_id?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Int']['output']>;
  date_updated?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['Int']['output']>;
};

export type Psre_Regions_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Psre_Regions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Psre_Regions_Filter>>>;
  chat_id?: InputMaybe<Psre_Chats_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Big_Int_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
};

export type Psre_Regions_Mutated = {
  data?: Maybe<Psre_Regions>;
  event?: Maybe<EventEnum>;
  key: Scalars['ID']['output'];
};

export type String_Filter_Operators = {
  _contains?: InputMaybe<Scalars['String']['input']>;
  _empty?: InputMaybe<Scalars['Boolean']['input']>;
  _ends_with?: InputMaybe<Scalars['String']['input']>;
  _eq?: InputMaybe<Scalars['String']['input']>;
  _icontains?: InputMaybe<Scalars['String']['input']>;
  _iends_with?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _istarts_with?: InputMaybe<Scalars['String']['input']>;
  _ncontains?: InputMaybe<Scalars['String']['input']>;
  _nempty?: InputMaybe<Scalars['Boolean']['input']>;
  _nends_with?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  _niends_with?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  _nistarts_with?: InputMaybe<Scalars['String']['input']>;
  _nnull?: InputMaybe<Scalars['Boolean']['input']>;
  _nstarts_with?: InputMaybe<Scalars['String']['input']>;
  _null?: InputMaybe<Scalars['Boolean']['input']>;
  _starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type Update_Psre_Account_State_Input = {
  action_points?: InputMaybe<Scalars['Int']['input']>;
  diamond?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  exp?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  food?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  fuel?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  level?: InputMaybe<Scalars['Int']['input']>;
  power?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  serum?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  stamina_points?: InputMaybe<Scalars['Int']['input']>;
  steel?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
  wood?: InputMaybe<Scalars['GraphQLBigInt']['input']>;
};

export type Version_Psre_Account = {
  alliance_id?: Maybe<Scalars['JSON']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  region_id?: Maybe<Scalars['JSON']['output']>;
  state?: Maybe<Scalars['JSON']['output']>;
  state_func?: Maybe<Count_Functions>;
  user?: Maybe<Scalars['String']['output']>;
  user_func?: Maybe<Count_Functions>;
};

export type Version_Psre_Account_Heroes = {
  account_id?: Maybe<Scalars['JSON']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  hero?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
};

export type Version_Psre_Account_State = {
  action_points?: Maybe<Scalars['Int']['output']>;
  diamond?: Maybe<Scalars['GraphQLBigInt']['output']>;
  exp?: Maybe<Scalars['GraphQLBigInt']['output']>;
  food?: Maybe<Scalars['GraphQLBigInt']['output']>;
  fuel?: Maybe<Scalars['GraphQLBigInt']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
  power?: Maybe<Scalars['GraphQLBigInt']['output']>;
  serum?: Maybe<Scalars['GraphQLBigInt']['output']>;
  stamina_points?: Maybe<Scalars['Int']['output']>;
  steel?: Maybe<Scalars['GraphQLBigInt']['output']>;
  wood?: Maybe<Scalars['GraphQLBigInt']['output']>;
};

export type Version_Psre_Alliances = {
  chat_id?: Maybe<Scalars['JSON']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  region_id?: Maybe<Scalars['JSON']['output']>;
};

export type Version_Psre_Chat_Message = {
  chat_id?: Maybe<Scalars['JSON']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
};

export type Version_Psre_Chats = {
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  type?: Maybe<Scalars['String']['output']>;
};

export type Version_Psre_Heroes = {
  atk: Scalars['Int']['output'];
  base_stars?: Maybe<Scalars['Int']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  def?: Maybe<Scalars['Int']['output']>;
  hp?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  style?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Version_Psre_Regions = {
  chat_id?: Maybe<Scalars['JSON']['output']>;
  date_created?: Maybe<Scalars['Date']['output']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']['output']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type GetAccountStateQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetAccountStateQuery = { psre_account_state_by_id?: { id: string, level?: number | null, action_points?: number | null, stamina_points?: number | null, food?: any | null, wood?: any | null, steel?: any | null, fuel?: any | null, diamond?: any | null, power?: any | null, serum?: any | null, exp?: any | null, date_created?: string | null, date_updated?: string | null } | null };

export type UpdateAccountStateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: Update_Psre_Account_State_Input;
}>;


export type UpdateAccountStateMutation = { update_psre_account_state_item?: { id: string, level?: number | null, action_points?: number | null, stamina_points?: number | null, food?: any | null, wood?: any | null, steel?: any | null, fuel?: any | null, diamond?: any | null, power?: any | null, serum?: any | null, exp?: any | null, date_created?: string | null, date_updated?: string | null } | null };
