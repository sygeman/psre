import { eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"

const HandlerName = "account/rename" as const

export type AccountRenameHandler = {
  [K in typeof HandlerName]: {
    data: {
      accountId: string
      name: string
    }
  }
}

export const renameAccount = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ event, db, dbSchema }) => {
    const { accountId, name } = event.data

    return await db
      .update(dbSchema.accounts)
      .set({ name })
      .where(eq(dbSchema.accounts.id, accountId))
      .returning()
  },
)
