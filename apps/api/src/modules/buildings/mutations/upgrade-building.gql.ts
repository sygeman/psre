import { gqlBuilder } from "@/lib/pothos"

gqlBuilder.mutationType({
  fields: (t) => ({
    upgradeBuilding: t.boolean({
      args: {
        id: t.arg({ type: "String", required: true }),
      },
      resolve: async (_parent, { id }, { currentAccountId, inngest }) => {
        await inngest.send({
          name: "building/upgrade",
          data: { buildingId: id, accountId: currentAccountId },
        })

        return true
      },
    }),
  }),
})
