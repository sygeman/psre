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
    return { success: true }
  },
)
