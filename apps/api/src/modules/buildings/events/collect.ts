import { eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"
import { resourcesMainChange } from "@/schema/events"

type BuildingType = "farm" | "lumber-mill" | "steel-plant" | "gas-field"
type ResourceType = "food" | "wood" | "steel" | "fuel"

const resourceByBuildingType: Record<BuildingType, ResourceType> = {
  farm: "food",
  "lumber-mill": "wood",
  "steel-plant": "steel",
  "gas-field": "fuel",
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

    const resources = await step.run("calc-resources", () => {
      const resources: Record<ResourceType, number> = {
        food: 0,
        wood: 0,
        steel: 0,
        fuel: 0,
      }

      for (const building of buildings) {
        resources[resourceByBuildingType[building.type as BuildingType]] +=
          10000 + 10 * building.level
      }

      return resources
    })

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
