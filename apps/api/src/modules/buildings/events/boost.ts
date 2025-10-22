import { inngest } from "@/lib/inngest"

const HandlerName = "building/boost" as const

export type BuildingBoostHandler = {
  [K in typeof HandlerName]: {
    data: {
      accountId: string
      buildingId: string
      timeMs: number
    }
  }
}

export const boostBuilding = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async () => {
    return { success: true }
  },
)
