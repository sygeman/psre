import { and } from "drizzle-orm"
import parse from "parse-duration"
import { inngest } from "@/lib/inngest"
import { boostBuilding, resourcesMainChange } from "@/schema/events"
import { FARM_UPGARDE_COST } from "../data/buildings-meta"
import type { ResourceType } from "../types"

const HandlerName = "building/upgrade" as const

export type BuildingUpgradeHandler = {
  [K in typeof HandlerName]: {
    data: {
      accountId: string
      buildingId: string
    }
  }
}

export const upgradeBuilding = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ event: { data }, step, db, dbSchema }) => {
    const building = await step.run("get-building-for-upgrade", async () => {
      const buildings = await db.query.buildings.findMany({
        where: (buildings, { eq }) =>
          and(
            eq(buildings.ownerId, data.accountId),
            eq(buildings.id, data.buildingId),
          ),
      })

      const building = buildings[0]
      if (!building) throw "Building not found"

      return building
    })

    const depedsOn = await step.run("check-depeds-on", async () => {
      // TODO: Calc real cost
      return true
    })

    if (!depedsOn) return { status: "depedsOn" }

    const cost = await step.run("calc-upgrade", async () => {
      const cost = FARM_UPGARDE_COST[4]
      if (!cost) throw "Cost not found"
      const [food, wood, steel, fuel, time] = cost
      // TODO: Calc real cost
      const resources: Record<ResourceType, number> = {
        food,
        wood,
        steel,
        fuel,
      }

      return { resources, time, timeMs: parse(time) }
    })

    const changeResourcesResult = await step.invoke("change-resources", {
      function: resourcesMainChange,
      data: {
        accountId: data.accountId,
        ...cost.resources,
      },
    })

    if (!changeResourcesResult) return { success: false }

    await inngest.send({
      name: "building/boost",
      data: {
        accountId: data.accountId,
        buildingId: data.buildingId,
      },
    })

    return { success: true }
  },
)
