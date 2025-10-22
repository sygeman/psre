import { eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"
import { changedBuilding } from "./changed"

const HandlerName = "building/set-upgrade-finished-at" as const

export type BuildingSetUpgradeFinishedAtHandler = {
  [K in typeof HandlerName]: {
    data: {
      buildingId: string
      accountId: string
      timeout: number
    }
  }
}

export const buildingSetUpgradeFinishedAt = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ event: { data }, step, db, dbSchema }) => {
    const building = await step.run(
      "set-upgrade-finished-at-in-db",
      async () => {
        const upgradeFinishedAt = new Date(Date.now() + data.timeout)

        return await db
          .update(dbSchema.buildings)
          .set({ upgradeFinishedAt })
          .where(eq(dbSchema.buildings.id, data.buildingId))
          .returning()
      },
    )

    await step.invoke("publish-building-changed", {
      function: changedBuilding,
      data: { accountId: data.accountId },
    })

    return building
  },
)
