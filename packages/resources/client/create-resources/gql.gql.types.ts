import * as Types from '@psre/types';

export type MainResourcesFragmentFragment = { __typename?: 'MainResources', id?: string | null, food?: string | null, wood?: string | null, steel?: string | null, fuel?: string | null, diamond?: string | null };

export type ResourcesMainQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ResourcesMainQuery = { __typename?: 'Query', resourcesMain?: { __typename?: 'MainResources', id?: string | null, food?: string | null, wood?: string | null, steel?: string | null, fuel?: string | null, diamond?: string | null } | null };

export type ResourcesMainChangedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type ResourcesMainChangedSubscription = { __typename?: 'Subscription', resourcesMainChanged?: { __typename?: 'MainResources', id?: string | null, food?: string | null, wood?: string | null, steel?: string | null, fuel?: string | null, diamond?: string | null } | null };
