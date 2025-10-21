import { inngest } from "@/lib/inngest"
import { changedBuilding } from "@/schema/events"
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
  async ({ event: { data }, step, db, dbSchema }) => {
    const buildings = await step.run("create-building-in-db", async () => {
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

      return buildings
    })

    await step.invoke("publish-building-changed", {
      function: changedBuilding,
      data: { accountId: data.accountId },
    })

    return buildings
  },
)
