import * as Types from '@/types';

export type MainResourcesFragmentFragment = { __typename?: 'MainResources', id?: string | null, food?: number | null, wood?: number | null, steel?: number | null, fuel?: number | null, diamond?: number | null };

export type ResourcesMainQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ResourcesMainQuery = { __typename?: 'Query', resourcesMain?: { __typename?: 'MainResources', id?: string | null, food?: number | null, wood?: number | null, steel?: number | null, fuel?: number | null, diamond?: number | null } | null };

export type ResourcesMainChangedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type ResourcesMainChangedSubscription = { __typename?: 'Subscription', resourcesMainChanged?: { __typename?: 'MainResources', id?: string | null, food?: number | null, wood?: number | null, steel?: number | null, fuel?: number | null, diamond?: number | null } | null };
