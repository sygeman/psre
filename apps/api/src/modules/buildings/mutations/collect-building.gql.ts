import { gqlBuilder } from "@/lib/pothos"

gqlBuilder.mutationType({
  fields: (t) => ({
    collectBuilding: t.boolean({
      args: {
        type: t.arg({ type: "String", required: true }),
      },
      resolve: async (_parent, { type }, { currentAccountId, inngest }) => {
        await inngest.send({
          name: "building/collect",
          data: { type, accountId: currentAccountId },
        })

        return true
      },
    }),
  }),
})
