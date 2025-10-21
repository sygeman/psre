import { gqlBuilder } from "@/lib/pothos"
import { Building } from "../types/building.type"

gqlBuilder.subscriptionType({
  fields: (t) => ({
    buildingsChanged: t.field({
      type: [Building],
      subscribe: (_parent, _args, { pubsub, currentAccountId }) => {
        return pubsub.subscribe("buildingsChanged", currentAccountId)
      },
      resolve: (buildings) => buildings,
    }),
  }),
})
