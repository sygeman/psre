import { builder } from "@/lib/pothos";
import { MainResources } from "../types/main-resources.type";

builder.subscriptionType({
  fields: (t) => ({
    resourcesMainChanged: t.field({
      type: MainResources,
      subscribe: (_parent, _args, { pubsub, currentAccountId }) => {
        return pubsub.subscribe("resourcesMainChanged", currentAccountId);
      },
      resolve: (message) => message,
    }),
  }),
});
