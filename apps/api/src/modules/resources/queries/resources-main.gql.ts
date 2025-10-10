import { builder } from "@/lib/pothos";
import { MainResources } from "../types/main-resources.type";

builder.queryType({
  fields: (t) => ({
    resourcesMain: t.field({
      type: MainResources,
      resolve: async (_parent, _args, { currentAccountId, db }) => {
        const account = await db.query.accounts.findFirst({
          where: (accounts, { eq }) => (eq(accounts.id, currentAccountId))
        })

        if (!account) return;

        return {
          id: account.id,
          food: account.food,
          wood: account.wood,
          steel: account.steel,
          fuel: account.fuel,
          diamond: account.diamond,
        };
      }
    }),
  }),
});
