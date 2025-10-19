import { gqlBuilder } from "@/lib/pothos"
import { Building } from "../types/building.type"

gqlBuilder.queryType({
  fields: (t) => ({
    buildings: t.field({
      type: [Building],
      resolve: async (_parent, _, { currentAccountId, db }) => {
        const buildings = await db.query.buildings.findMany({
          where: (buildings, { eq }) => eq(buildings.ownerId, currentAccountId),
          orderBy: (buildings, { desc }) => [desc(buildings.createdAt)],
        })

        return buildings
      },
    }),
  }),
})
