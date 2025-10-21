import { eq } from "drizzle-orm"
import { increment } from "@/lib/drizzle"
import { inngest } from "@/lib/inngest"
import { changedBuilding } from "@/schema/events"

const HandlerName = "building/boost" as const

export type BuildingBoostHandler = {
  [K in typeof HandlerName]: {
    data: {
      accountId: string
      buildingId: string
    }
  }
}

export const boostBuilding = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ event: { data }, step, db, dbSchema }) => {
    const boost = await step.waitForEvent("wait-for-new-boost", {
      event: HandlerName,
      timeout: "15s",
      match: "data.buildingId",
    })

    if (boost) return { canceled: true }

    await step.run("update-building-level", async () => {
      return await db
        .update(dbSchema.buildings)
        .set({ level: increment(dbSchema.buildings.level, 1) })
        .where(eq(dbSchema.buildings.id, data.buildingId))
        .returning()
    })

    await step.invoke("publish-building-changed", {
      function: changedBuilding,
      data: { accountId: data.accountId },
    })

    return { success: true }
  },
)
