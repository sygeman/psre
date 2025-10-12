import { gqlBuilder } from "@/lib/pothos"
import { Building } from "../types/building.type"

gqlBuilder.queryType({
  fields: (t) => ({
    buildings: t.field({
      type: [Building],
      resolve: (_parent, _, { currentAccountId }) => {
        return []
      },
    }),
  }),
})
