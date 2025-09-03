import { users as usersTable } from '@/db/schema/users'
import { accounts as accountsTable } from '@/db/schema/accounts'
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { regenerateToken } from './regenerate-token';

export const createUser = async ({ telegramId }: { telegramId: number | string }) => {
  telegramId = telegramId.toString()

  // Find user
  let user = await db.query.users.findFirst({
    where: (users, { eq }) => (eq(users.telegramId, telegramId))
  })

  // Create user if not exist
  if (!user) {
    // Create user
    const users = await db.insert(usersTable).values({ telegramId }).returning();
    user = users[0];

    if (!user) throw 'User not found';

    const accounts = await db.insert(accountsTable).values({
      userId: user.id,
      name: crypto.randomUUID().toString()
    }).returning();

    const account = accounts[0]

    if (!account) throw 'Account not found';

    await db.update(usersTable)
      .set({ currentAccountId: account.id })
      .where(eq(accountsTable.id, account.id))
      .from(accountsTable)
  }

  // Generate auth token
  const token = await regenerateToken(user.id)

  return { token, user }
}
