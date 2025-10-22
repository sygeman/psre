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
  {
    id: HandlerName.replace("/", "-"),
    batchEvents: {
      maxSize: 100,
      timeout: "2s",
      key: "event.data.buildingId",
    },
  },
  { event: HandlerName },
  async ({ step }) => {
    // trigger building/boost-batch
    return { success: true }
  },
)

