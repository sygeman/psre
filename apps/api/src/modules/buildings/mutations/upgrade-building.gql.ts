import { gqlBuilder } from "@/lib/pothos"

gqlBuilder.mutationType({
  fields: (t) => ({
    upgradeBuilding: t.boolean({
      args: {
        id: t.arg({ type: "String", required: true }),
      },
      resolve: async (_parent, { id }, { currentAccountId, inngest }) => {
        // await inngest.send({
        //   name: "building/collect",
        //   data: { type, accountId: currentAccountId },
        // })

        return true
      },
    }),
  }),
})
