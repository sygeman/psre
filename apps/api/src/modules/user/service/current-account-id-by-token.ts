import { db } from "@/lib/drizzle"

export const currentAccountIdByToken = async (token?: string) => {
  if (!token) return false

  try {
    const user = await db.query.users.findFirst({
      // where: (users, { eq }) => (eq(users.token, token))
    })

    return user?.currentAccountId || false
  } catch {
    return false
  }
}
