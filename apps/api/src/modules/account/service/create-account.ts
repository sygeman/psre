import { users as usersTable } from '@/db/schema/users'
import { accounts as accountsTable } from '@/db/schema/accounts'
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { getLatestRegion } from '@/modules/region/service/get-latest-region';

export const createAccount = async ({ userId, regionId }: { userId: number, regionId?: number }) => {
  // If regionId is null -> select latest region
  if (!regionId) {
    const { region } = await getLatestRegion();
    regionId = region.id;
  }

  const accounts = await db.insert(accountsTable).values({
    userId,
    regionId,
    name: crypto.randomUUID().toString()
  }).returning();

  const account = accounts[0]

  if (!account) throw 'Account not found';

  await db.update(usersTable)
    .set({ currentAccountId: account.id })
    .where(eq(usersTable.id, userId))

  return { account };
}
