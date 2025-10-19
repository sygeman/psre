import { gql } from "@/apollo"

export const BUILDING_FRAGMENT = gql`
  fragment BuildingFragment on Building {
      id
      level
      type
      collectedAt
  }
`

export const BUILDINGS_QUERY = gql`
  query GetBuildings {
    buildings {
        ...BuildingFragment
    }
  }

  ${BUILDING_FRAGMENT}
`

export const COLLECT_BUILDING_MUTATION = gql`
  mutation CollectBuilding($type: String!) {
    collectBuilding(type: $type)
  }
`

export const UPGRADE_BUILDING_MUTATION = gql`
  mutation UpgradeBuilding($id: String!) {
      upgradeBuilding(id: $id)
  }
`
