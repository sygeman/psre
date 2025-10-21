import { eq } from "drizzle-orm"
import { increment } from "@/lib/drizzle"
import { inngest } from "@/lib/inngest"

const HandlerName = "resources/main-change" as const

export type ResourcesMainChangeHandler = {
  [K in typeof HandlerName]: {
    data: {
      accountId: string
      food: number
      wood: number
      steel: number
      fuel: number
    }
  }
}

export const resourcesMainChange = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ event: { data }, step, db, dbSchema, pubsub }) => {
    const result = await step.run("change-resources-in-db", async () => {
      return await db.transaction(async (tx) => {
        const account = await tx.query.accounts.findFirst({
          where: (accounts, { eq }) => eq(accounts.id, data.accountId),
        })

        if (!account) return false

        if (
          account.food + data.food < 0 ||
          account.wood + data.wood < 0 ||
          account.steel + data.steel < 0 ||
          account.fuel + data.fuel < 0
        ) {
          return false
        }

        const accounts = await tx
          .update(dbSchema.accounts)
          .set({
            food: increment(dbSchema.accounts.food, data.food),
            wood: increment(dbSchema.accounts.wood, data.wood),
            steel: increment(dbSchema.accounts.steel, data.steel),
            fuel: increment(dbSchema.accounts.fuel, data.fuel),
          })
          .where(eq(dbSchema.accounts.id, data.accountId))
          .returning()

        return accounts[0]
      })
    })

    if (!result) return result

    await step.run("publish-resources-event", async () => {
      pubsub.publish("resourcesMainChanged", data.accountId, {
        id: data.accountId,
        food: result.food,
        wood: result.wood,
        steel: result.steel,
        fuel: result.fuel,
        diamond: result.diamond,
      })
    })

    return result
  },
)
