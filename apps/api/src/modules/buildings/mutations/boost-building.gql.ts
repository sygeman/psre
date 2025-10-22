import { gqlBuilder } from "@/lib/pothos"

gqlBuilder.mutationType({
  fields: (t) => ({
    boostBuilding: t.boolean({
      args: {
        id: t.arg({ type: "String", required: true }),
      },
      resolve: async (_parent, { id }, { currentAccountId, inngest }) => {
        await inngest.send({
          name: "building/boost",
          data: { buildingId: id, accountId: currentAccountId, timeMs: 10000 },
        })

        return true
      },
    }),
  }),
})
