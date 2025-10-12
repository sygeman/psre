import { eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"

export const renameAccount = inngest.createFunction(
  { id: "account-rename" },
  { event: "account/rename" },
  async ({ event, db, dbSchema }) => {
    const { accountId, name } = event.data

    return await db
      .update(dbSchema.accounts)
      .set({ name })
      .where(eq(dbSchema.accounts.id, accountId))
      .returning()
  },
)
