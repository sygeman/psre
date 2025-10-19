import { inngest } from "@/lib/inngest"
import type { BuildingType } from "../types"

const HandlerName = "building/create" as const

export type BuildingCreateHandler = {
  [K in typeof HandlerName]: {
    data: {
      accountId: string
      type: BuildingType
      level?: number
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
        .values({
          ownerId: data.accountId,
          type: data.type,
          level: data.level || 1,
        })
        .returning()
      const building = buildings[0]

      return building
    })

    return { success: true }
  },
)
