import { desc, eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"
import { ACCOUNT_EVENTS, ACCOUNT_FUNCTION_IDS } from "../account.events"

export const createAccount = inngest.createFunction(
  { id: ACCOUNT_FUNCTION_IDS.CREATE_HANDLER },
  { event: ACCOUNT_EVENTS.CREATE },
  async ({ event, step, db, dbSchema }) => {
    let { userId, regionId, name } = event.data

    if (!regionId) {
      regionId = await step.run("get-latest-region-id", async () => {
        const region = await db.query.regions.findFirst({
          orderBy: [desc(dbSchema.regions.id)],
        })

        if (!region) throw "Region not found"
        return region.id
      })
    }

    if (!regionId) throw "Region not found"

    const account = await step.run("create-account-in-db", async () => {
      const accounts = await db
        .insert(dbSchema.accounts)
        .values({
          userId,
          regionId,
          name: name || crypto.randomUUID(),
        })
        .returning()

      return accounts[0]
    })

    if (!account) throw "Account not found"

    await step.run("update-current-account-id", async () => {
      return db.update(dbSchema.users).set({ currentAccountId: account.id }).where(eq(dbSchema.users.id, userId))
    })

    return { account }
  },
)
