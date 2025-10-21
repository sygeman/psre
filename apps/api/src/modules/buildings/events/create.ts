import { inngest } from "@/lib/inngest"
import type { BuildingType } from "../types"

const HandlerName = "building/create" as const

export type BuildingCreateHandler = {
  [K in typeof HandlerName]: {
    data: {
      accountId: string
      buildings: {
        type: BuildingType
        level?: number
      }[]
    }
  }
}

export const createBuilding = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ event: { data }, step, db, dbSchema, pubsub }) => {
    await step.run("create-building-in-db", async () => {
      const buildings = await db
        .insert(dbSchema.buildings)
        .values(
          data.buildings.map((building) => ({
            ownerId: data.accountId,
            type: building.type,
            level: building.level || 1,
          })),
        )
        .returning()
      const building = buildings[0]

      return building
    })

    await step.run("publish-building-changed", async () => {
      const buildings = await db.query.buildings.findMany({
        where: (buildings, { eq }) => eq(buildings.ownerId, data.accountId),
        orderBy: (buildings, { desc }) => [desc(buildings.createdAt)],
      })

      pubsub.publish("buildingsChanged", data.accountId, buildings)

      return buildings
    })

    return { success: true }
  },
)
