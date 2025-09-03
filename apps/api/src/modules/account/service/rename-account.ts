import { accounts as accountsTable } from '@/db/schema/accounts'
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const renameAccount = async ({ accountId, name }: { accountId: number, name: string }) => {
  return await db.update(accountsTable)
    .set({ name })
    .where(eq(accountsTable.id, accountId))
    .returning();
}
