import { users as usersTable } from '@/db/schema/users'
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { generateToken } from './generate-token';

export const regenerateToken = async (userId: number) => {
  // Generate auth token
  const token = generateToken()

  await db.update(usersTable)
    .set({ token })
    .where(eq(usersTable.id, userId))

  return token;
}
