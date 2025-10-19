import { createMemo, createSignal } from "solid-js"
import { createMutation, useApollo } from "@/apollo"
import { buildingsMetaData } from "../data"
import {
  BUILDINGS_QUERY,
  COLLECT_BUILDING_MUTATION,
  UPGRADE_BUILDING_MUTATION,
} from "./gql"
import type {
  CollectBuildingMutation,
  CollectBuildingMutationVariables,
  GetBuildingsQuery,
  GetBuildingsQueryVariables,
  UpgradeBuildingMutation,
  UpgradeBuildingMutationVariables,
} from "./gql.gql.types"

export const createBuildings = () => {
  const [buildingsRaw, setBuildingsRaw] = createSignal([])
  const apolloClient = useApollo()

  const buildings = createMemo(() => {
    console.log(buildingsRaw())
    return buildingsRaw().map((building) => ({
      ...buildingsMetaData[building.type],
      id: building.id,
      level: building.level,
      collectionTime: 0,
      upgradeDuration: 0,
      upgrade: () => upgradeBuilding(building.id),
      collect: () => collectBuilding(building.type),
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

  return { buildings }
}
