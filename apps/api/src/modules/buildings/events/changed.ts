import { inngest } from "@/lib/inngest"

const HandlerName = "building/changed" as const

export type BuildingChangedHandler = {
  [K in typeof HandlerName]: {
    data: {
      accountId: string
    }
  }
}

export const changedBuilding = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ event: { data }, step, db, pubsub }) => {
    await step.run("publish-building-changed", async () => {
      const buildings = await db.query.buildings.findMany({
        where: (buildings, { eq }) => eq(buildings.ownerId, data.accountId),
        orderBy: (buildings, { desc }) => [desc(buildings.createdAt)],
      })

      pubsub.publish("buildingsChanged", data.accountId, buildings)

      return buildings
    })

    return { success: true }
  },
)
