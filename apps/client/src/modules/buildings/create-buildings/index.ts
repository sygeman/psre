import { createMemo, createSignal, onCleanup } from "solid-js"
import { createMutation, useApollo } from "@/apollo"
import { buildingsMetaData } from "../data"
import {
  BOOST_BUILDING_MUTATION,
  BUILDINGS_CHANGED_SUBSCRIPTION,
  BUILDINGS_QUERY,
  COLLECT_BUILDING_MUTATION,
  UPGRADE_BUILDING_MUTATION,
} from "./gql"
import type {
  BoostBuildingMutation,
  BoostBuildingMutationVariables,
  BuildingsChangedSubscription,
  BuildingsChangedSubscriptionVariables,
  CollectBuildingMutation,
  CollectBuildingMutationVariables,
  GetBuildingsQuery,
  GetBuildingsQueryVariables,
  UpgradeBuildingMutation,
  UpgradeBuildingMutationVariables,
} from "./gql.gql.types"

const diffMs = (endAt: Date | null) => {
  if (!endAt) return 0
  return new Date(endAt).getTime() - Date.now()
}

export const createBuildings = () => {
  const [buildingsRaw, setBuildingsRaw] = createSignal([])
  const apolloClient = useApollo()

  const buildings = createMemo(() => {
    return buildingsRaw().map((building) => ({
      ...buildingsMetaData[building.type],
      id: building.id,
      level: building.level,
      collectionTime: 0,
      upgradeDuration: diffMs(building.upgradeFinishedAt) / 1000,
      upgrade: () => upgradeBuilding(building.id),
      collect: () => collectBuilding(building.type),
      boost: () => boostBuilding(building.id),
    }))
  })

  apolloClient
    .query<GetBuildingsQuery, GetBuildingsQueryVariables>({
      query: BUILDINGS_QUERY,
    })
    .then(({ data }) => {
      const buildings = data?.buildings
      if (!buildings) return

      setBuildingsRaw(buildings)
    })

  const [collectBuildingMutation] = createMutation<
    CollectBuildingMutation,
    CollectBuildingMutationVariables
  >(COLLECT_BUILDING_MUTATION)

  const collectBuilding = (type: string) => {
    collectBuildingMutation({ variables: { type } })
  }

  const [upgradeBuildingMutation] = createMutation<
    UpgradeBuildingMutation,
    UpgradeBuildingMutationVariables
  >(UPGRADE_BUILDING_MUTATION)

  const upgradeBuilding = (id: string) => {
    upgradeBuildingMutation({ variables: { id } })
  }

  const [boostBuildingMutation] = createMutation<
    BoostBuildingMutation,
    BoostBuildingMutationVariables
  >(BOOST_BUILDING_MUTATION)

  const boostBuilding = (id: string) => {
    boostBuildingMutation({ variables: { id } })
  }

  const subscription = apolloClient
    .subscribe<
      BuildingsChangedSubscription,
      BuildingsChangedSubscriptionVariables
    >({
      query: BUILDINGS_CHANGED_SUBSCRIPTION,
    })
    .subscribe({
      next: (data) => {
        const buildings = data.data.buildingsChanged
        if (!buildings) return

        setBuildingsRaw(buildings)
      },
    })

  onCleanup(() => {
    subscription.unsubscribe()
  })

  return { buildings }
}
