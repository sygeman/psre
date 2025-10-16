import { createSignal, onCleanup } from "solid-js"
import { useApollo } from "@/apollo"
import {
  MAIN_RESOURCES_CHANGED_SUBSCRIPTION,
  MAIN_RESOURCES_QUERY,
} from "./gql"
import type {
  ResourcesMainChangedSubscription,
  ResourcesMainChangedSubscriptionVariables,
  ResourcesMainQuery,
  ResourcesMainQueryVariables,
} from "./gql.gql.types"

export const createResources = () => {
  const apolloClient = useApollo()
  const [food, setFood] = createSignal(0)
  const [wood, setWood] = createSignal(0)
  const [steel, setSteel] = createSignal(0)
  const [fuel, setFuel] = createSignal(0)
  const [diamond, setDiamond] = createSignal(0)

  apolloClient
    .query<ResourcesMainQuery, ResourcesMainQueryVariables>({
      query: MAIN_RESOURCES_QUERY,
    })
    .then(({ data }) => {
      const resourcesMain = data?.resourcesMain
      if (!resourcesMain) return

      const { food, wood, steel, fuel, diamond } = resourcesMain
      setFood(food)
      setWood(wood)
      setSteel(steel)
      setFuel(fuel)
      setDiamond(diamond)
    })

  const subscription = apolloClient
    .subscribe<
      ResourcesMainChangedSubscription,
      ResourcesMainChangedSubscriptionVariables
    >({
      query: MAIN_RESOURCES_CHANGED_SUBSCRIPTION,
    })
    .subscribe({
      next: (data) => {
        const { food, wood, steel, fuel, diamond } =
          data.data.resourcesMainChanged
        setFood(food)
        setWood(wood)
        setSteel(steel)
        setFuel(fuel)
        setDiamond(diamond)
      },
    })

  onCleanup(() => {
    subscription.unsubscribe()
  })

  return { food, wood, steel, fuel, diamond }
}
