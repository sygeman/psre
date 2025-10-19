import { eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"
import { resourcesMainChange } from "@/schema/events"
import {
  BUILDINGS_META,
  CAP_MULTIPLIER,
  RESOURCES_OUTPUT,
} from "./resources-output"

type BuildingType = "farm" | "lumber-mill" | "steel-plant" | "gas-field"
type ResourceType = "food" | "wood" | "steel" | "fuel"

const resourceByBuildingType: Record<BuildingType, ResourceType> = {
  farm: "food",
  "lumber-mill": "wood",
  "steel-plant": "steel",
  "gas-field": "fuel",
}

function getOutputAndCap(type: BuildingType, level: number) {
  const meta = BUILDINGS_META[type]
  const resourceOutput = RESOURCES_OUTPUT[level - 1]
  if (!resourceOutput) throw "resourceOutput not found"
  const outputPerHour = resourceOutput[meta.outputIndex]
  if (!outputPerHour) throw "outputPerHour invalid"

  return { outputPerHour, cap: outputPerHour * CAP_MULTIPLIER }
}

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
        const buildingData = getOutputAndCap(
          building.type as BuildingType,
          building.level,
        )

        if (building.collectedAt === null) continue

        const collectedAt = new Date(building.collectedAt).getTime()
        const diffInMs = Date.now() - collectedAt
        const fullHours = Math.floor(Math.abs(diffInMs) / (1000 * 60 * 60))

        const timeMultiplier = fullHours
        const resourceCount =
          timeMultiplier *
          Math.min(buildingData.outputPerHour, buildingData.cap)

        resources[resourceByBuildingType[building.type as BuildingType]] +=
          resourceCount
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
