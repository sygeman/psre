import { inngest } from "@/lib/inngest"

const HandlerName = "building/boost-batch" as const

export type BuildingBoostBatchHandler = {
  [K in typeof HandlerName]: {
    data: {
      accountId: string
      buildingId: string
      durationMs: number
    }
  }
}

export const boostBatchBuilding = inngest.createFunction(
  {
    id: HandlerName.replace("/", "-"),
  },
  { event: HandlerName },
  async ({ event }) => {
    return event.data
  },
)
