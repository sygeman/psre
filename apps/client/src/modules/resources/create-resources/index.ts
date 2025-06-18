import { createSignal, onCleanup } from "solid-js";
import { useApollo } from "@/apollo";
import {
  MAIN_RESOURCES_CHANGED_SUBSCRIPTION,
  MAIN_RESOURCES_QUERY,
} from "./gql";
import {
  ResourcesMainChangedSubscription,
  ResourcesMainChangedSubscriptionVariables,
  ResourcesMainQuery,
  ResourcesMainQueryVariables,
} from "./gql.gql.types";

export const createResources = () => {
  const apolloClient = useApollo();
  const [food, setFood] = createSignal(0);
  const [wood, setWood] = createSignal(0);
  const [steel, setSteel] = createSignal(0);
  const [fuel, setFuel] = createSignal(0);
  const [diamond, setDiamond] = createSignal(0);

  apolloClient
    .query<
      ResourcesMainQuery,
      ResourcesMainQueryVariables
    >({ query: MAIN_RESOURCES_QUERY })
    .then(({ data }) => {
      const resourcesMain = data?.resourcesMain;
      if (!resourcesMain) return;

      const { food, wood, steel, fuel, diamond } = resourcesMain;
      setFood(parseInt(food));
      setWood(parseInt(wood));
      setSteel(parseInt(steel));
      setFuel(parseInt(fuel));
      setDiamond(parseInt(diamond));
    });

  const subscription = apolloClient
    .subscribe<
      ResourcesMainChangedSubscription,
      ResourcesMainChangedSubscriptionVariables
    >({
      query: MAIN_RESOURCES_CHANGED_SUBSCRIPTION,
    })
    .subscribe({
      next: (data) => {
        console.log(data);
      },
    });

  onCleanup(() => {
    subscription.unsubscribe();
  });

  return { food, wood, steel, fuel, diamond };
};
