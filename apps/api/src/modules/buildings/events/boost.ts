import parse from "parse-duration"
import { inngest } from "@/lib/inngest"
import type { ITEMS } from "@/schema/items"

type ItemType = (typeof ITEMS)[number]

const HandlerName = "building/boost" as const

export type BuildingBoostHandler = {
  [K in typeof HandlerName]: {
    data: {
      accountId: string
      buildingId: string
      speedup: ItemType
    }
  }
}

export const boostBuilding = inngest.createFunction(
  {
    id: HandlerName.replace("/", "-"),
    timeouts: { start: "5s", finish: "3s" },
    batchEvents: {
      maxSize: 100,
      timeout: "3s",
      key: "event.data.buildingId",
    },
  },
  { event: HandlerName },
  async ({
    events,
    event: {
      data: { accountId, buildingId },
    },
  }) => {
    const validItems = ["speedup-build-", "speedup-omni"]
    let durationMs = 0

    for (const {
      data: { speedup },
    } of events) {
      for (const validItem of validItems) {
        const durationString = speedup.replace(validItem, "")
        if (speedup.length === durationString.length) continue
        const duration = parse(durationString)
        if (duration === null) continue
        durationMs += duration
      }
    }

    await inngest.send({
      name: "building/boost-batch",
      data: { accountId, buildingId, durationMs },
    })

    return { success: true }
  },
)
