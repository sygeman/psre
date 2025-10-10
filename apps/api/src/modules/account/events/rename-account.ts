import { eq } from "drizzle-orm";
import { inngest } from "@/lib/inngest";
import { ACCOUNT_EVENTS, ACCOUNT_FUNCTION_IDS } from "../account.events";

export const renameAccount = inngest.createFunction(
  { id: ACCOUNT_FUNCTION_IDS.RENAME_HANDLER },
  { event: ACCOUNT_EVENTS.RENAME },
  async ({ event, db, dbSchema }) => {
    const { accountId, name } = event.data;

    return await db
      .update(dbSchema.accounts)
      .set({ name })
      .where(eq(dbSchema.accounts.id, accountId))
      .returning();
  }
);
