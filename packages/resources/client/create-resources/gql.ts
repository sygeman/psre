import { gql } from "@psre/apollo";

export const MAIN_RESOURCES_FRAGMENT = gql`
  fragment MainResourcesFragment on MainResources {
    id
    food
    wood
    steel
    fuel
    diamond
  }
`;

export const MAIN_RESOURCES_QUERY = gql`
  query ResourcesMain {
    resourcesMain {
      ...MainResourcesFragment
    }
  }

  ${MAIN_RESOURCES_FRAGMENT}
`;

export const MAIN_RESOURCES_CHANGED_SUBSCRIPTION = gql`
  subscription ResourcesMainChanged {
    resourcesMainChanged {
      ...MainResourcesFragment
    }
  }

  ${MAIN_RESOURCES_FRAGMENT}
`;
