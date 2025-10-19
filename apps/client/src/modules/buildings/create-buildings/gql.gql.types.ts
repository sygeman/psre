import * as Types from '@/types';

export type BuildingFragmentFragment = { __typename?: 'Building', id?: string | null, level?: number | null, type?: string | null, collectedAt?: any | null };

export type GetBuildingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetBuildingsQuery = { __typename?: 'Query', buildings?: Array<{ __typename?: 'Building', id?: string | null, level?: number | null, type?: string | null, collectedAt?: any | null }> | null };

export type CollectBuildingMutationVariables = Types.Exact<{
  type: Types.Scalars['String']['input'];
}>;


export type CollectBuildingMutation = { __typename?: 'Mutation', collectBuilding?: boolean | null };

export type UpgradeBuildingMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type UpgradeBuildingMutation = { __typename?: 'Mutation', upgradeBuilding?: boolean | null };
