import { gql } from "@/apollo"

export const BUILDING_FRAGMENT = gql`
  fragment BuildingFragment on Building {
      id
      level
      type
      collectedAt
      upgradeFinishedAt
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

export const BOOST_BUILDING_MUTATION = gql`
  mutation BoostBuilding($id: String!) {
      boostBuilding(id: $id)
  }
`

export const BUILDINGS_CHANGED_SUBSCRIPTION = gql`
  subscription BuildingsChanged {
    buildingsChanged {
      ...BuildingFragment
    }
  }

  ${BUILDING_FRAGMENT}
`
