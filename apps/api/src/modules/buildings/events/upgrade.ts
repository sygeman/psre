import { and, eq } from "drizzle-orm"
import parse from "parse-duration"
import { increment } from "@/lib/drizzle"
import { inngest } from "@/lib/inngest"
import {
  buildingSetUpgradeFinishedAt,
  changedBuilding,
  resourcesMainChange,
} from "@/schema/events"
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
      const building = await db.query.buildings.findFirst({
        where: (buildings, { eq }) =>
          and(
            eq(buildings.ownerId, data.accountId),
            eq(buildings.id, data.buildingId),
          ),
      })

      if (!building) throw "Building not found"

      return building
    })

    const depedsOn = await step.run("check-depeds-on", async () => {
      // TODO: Calc real cost
      return true
    })

    if (!depedsOn) return { status: "depedsOn" }

    const cost = await step.run("calc-upgrade", async () => {
      const cost = FARM_UPGARDE_COST[2]
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

    if (cost.timeMs === null) throw "cost timeMs is null"

    const changeResourcesResult = await step.invoke("change-resources", {
      function: resourcesMainChange,
      data: {
        accountId: data.accountId,
        ...cost.resources,
      },
    })

    if (!changeResourcesResult) return { success: false }

    const waitBoost = async (timeout: number) => {
      const boost = await step.waitForEvent("wait-for-boost", {
        event: "building/boost", // building/boost-batch
        timeout,
        if: "async.data.buildingId == event.data.buildingId",
      })

      if (!boost) return

      const newTimeout = await step.run("calc-new-timeout", async () => {
        const building = await db.query.buildings.findFirst({
          where: (buildings, { eq }) => eq(buildings.id, data.buildingId),
        })

        if (!building?.upgradeFinishedAt) return 0

        const upgradeFinishedAt = new Date(building.upgradeFinishedAt).getTime()

        return Math.max(upgradeFinishedAt - Date.now() - boost.data.timeMs, 0)
      })

      if (newTimeout <= 0) return

      await Promise.all([
        waitBoost(newTimeout),
        step.invoke("set-upgrade-finished-at", {
          function: buildingSetUpgradeFinishedAt,
          data: {
            buildingId: data.buildingId,
            timeout: newTimeout,
            accountId: data.accountId,
          },
        }),
      ])
    }

    await Promise.all([
      step.invoke("set-upgrade-finished-at", {
        function: buildingSetUpgradeFinishedAt,
        data: {
          buildingId: data.buildingId,
          timeout: cost.timeMs,
          accountId: data.accountId,
        },
      }),
      waitBoost(cost.timeMs),
    ])

    await step.run("update-building-level", async () => {
      return await db
        .update(dbSchema.buildings)
        .set({
          level: increment(dbSchema.buildings.level, 1),
          upgradeFinishedAt: null,
        })
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
