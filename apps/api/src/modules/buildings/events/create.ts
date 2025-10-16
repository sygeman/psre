import { eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"

const HandlerName = "building/create" as const

export type BuildingCreateHandler = {
  [K in typeof HandlerName]: {
    data: {
      accountId: string
      type: string
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
        .values({ ownerId: data.accountId, type: data.type })
        .returning()
      const building = buildings[0]

      return building
    })

    return { success: true }
  },
)
