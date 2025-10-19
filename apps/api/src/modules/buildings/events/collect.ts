import { eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"
import { resourcesMainChange } from "@/schema/events"
import { getBuildingMeta } from "../helpers/building-meta"
import type { BuildingType, ResourceType } from "../types"

const HandlerName = "building/collect" as const

export type BuildingCollectHandler = {
  [K in typeof HandlerName]: {
    data: {
      accountId: string
      type: BuildingType
    }
  }
}

export const collectBuilding = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ event: { data }, step, db, dbSchema }) => {
    const buildings = await step.run("check-building-state", async () => {
      const buildings = await db.query.buildings.findMany({
        where: (buildings, { eq }) => eq(buildings.ownerId, data.accountId),
      })

      return buildings
    })

    const { resources, resourcesSum } = await step.run("calc-resources", () => {
      const resources: Record<ResourceType, number> = {
        food: 0,
        wood: 0,
        steel: 0,
        fuel: 0,
      }

      for (const building of buildings) {
        const buildingType = building.type
        const buildingMeta = getBuildingMeta(buildingType, building.level)

        if (building.collectedAt === null) continue

        const collectedAt = new Date(building.collectedAt).getTime()
        const diffInMs = Date.now() - collectedAt
        // const HOUR_MS = 1000 * 60 * 60
        // const fullHours = Math.floor(Math.abs(diffInMs) / HOUR_MS)
        const timeMultiplier = Math.floor(Math.abs(diffInMs) / 1000)

        const resourceRawCount = timeMultiplier * buildingMeta.outputPerHour
        const resourceCountWithCap = Math.min(
          resourceRawCount,
          buildingMeta.cap,
        )

        resources[buildingMeta.resourceType] += resourceCountWithCap
      }

      const resourcesSum = Object.values(resources).reduce(
        (sum, el) => sum + el,
      )

      return { resources, resourcesSum }
    })

    if (resourcesSum <= 0) return { success: true }

    await Promise.all([
      step.invoke("change-resources", {
        function: resourcesMainChange,
        data: {
          accountId: data.accountId,
          ...resources,
        },
      }),
      step.run("update-building-collected-at", async () => {
        return await db
          .update(dbSchema.buildings)
          .set({ collectedAt: new Date() })
          .where(eq(dbSchema.buildings.ownerId, data.accountId))
          .returning()
      }),
    ])

    return { success: true }
  },
)
