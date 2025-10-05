import { accounts as accountsTable } from '@/db/schema/accounts'
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { inngest } from '@/lib/inngest';
import { ACCOUNT_EVENTS, ACCOUNT_FUNCTION_IDS } from '../account.events';

export const renameAccount = inngest.createFunction(
  { id: ACCOUNT_FUNCTION_IDS.RENAME_HANDLER },
  { event: ACCOUNT_EVENTS.RENAME },
  async ({ event }) => {
    const { accountId, name } = event.data;

    return await db.update(accountsTable)
      .set({ name })
      .where(eq(accountsTable.id, accountId))
      .returning();
  });
