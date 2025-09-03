import { users as usersTable } from '@/db/schema/users'
import { db } from "@/db";
import { regenerateToken } from './regenerate-token';
import { createAccount } from '@/modules/account/service/create-account';

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

    const { account } = await createAccount({ userId: user.id });
    user.currentAccountId = account.id
  }

  // Generate auth token
  const token = await regenerateToken(user.id)


  return { token, user }
}
