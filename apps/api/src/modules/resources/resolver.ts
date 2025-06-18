import { builder } from "@/lib/builder";
import { resourcesMain } from "./service/resources-main";
import { MainResources } from "./types/main-resources.type";

export const buildResolver = () => {
  builder.queryType({
    fields: (t) => ({
      resourcesMain: t.field({
        type: MainResources,
        resolve: (_parent, _args, { currentAccountId }) =>
          resourcesMain({ currentAccountId }),
      }),
    }),
  });

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
};
