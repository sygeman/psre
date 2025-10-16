import { type AnyColumn, eq, sql } from "drizzle-orm"
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

const increment = (column: AnyColumn, value = 0) => {
  return sql`${column} + ${value}`
}

export const resourcesMainChange = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ event: { data }, step, db, dbSchema, pubsub }) => {
    const accounts = await step.run("change-resources-in-db", async () => {
      return await db
        .update(dbSchema.accounts)
        .set({
          food: increment(dbSchema.accounts.food, data.food),
          wood: increment(dbSchema.accounts.wood, data.wood),
          steel: increment(dbSchema.accounts.steel, data.steel),
          fuel: increment(dbSchema.accounts.fuel, data.fuel),
        })
        .where(eq(dbSchema.accounts.id, data.accountId))
        .returning()
    })

    const account = accounts[0]

    if (!account) throw "Account not found"

    await step.run("publish-resources-event", async () => {
      pubsub.publish("resourcesMainChanged", data.accountId, {
        id: data.accountId,
        food: account.food,
        wood: account.wood,
        steel: account.steel,
        fuel: account.fuel,
        diamond: account.diamond,
      })
    })

    return { success: true }
  },
)
