import { createAccount } from "@/modules/account/events/create-account"
import { USER_EVENTS, USER_FUNCTION_IDS } from "../user.events"
import { inngest } from "@/lib/inngest"
import { generateToken } from "../service/generate-token"
import { eq } from "drizzle-orm"

export const createUser = inngest.createFunction(
  { id: USER_FUNCTION_IDS.CREATE_HANDLER },
  { event: USER_EVENTS.CREATE },
  async ({ event, step, db, dbSchema }) => {
    let { telegramId, token, name } = event.data

    telegramId = telegramId.toString()

    let user = await step.run("find-user-in-db", () => {
      return db.query.users.findFirst({
        where: (users, { eq }) => eq(users.telegramId, telegramId),
      })
    })

    if (user) {
      if (!token) {
        token = await step.run("regenerate-token", async () => {
          const token = generateToken()

          await db.update(dbSchema.users).set({ token }).where(eq(dbSchema.users.id, user.id))

          return token
        })
      }

      return { token, user }
    }

    if (!token) {
      token = generateToken()
    }

    user = await step.run("create-user-in-db", async () => {
      const users = await db
        .insert(dbSchema.users)
        .values({
          telegramId,
          token,
        })
        .returning()

      return users[0]
    })

    if (!user) throw "User not found"

    const { account } = await step.invoke("create-account", {
      function: createAccount,
      data: { telegramId, name, userId: user.id },
    })

    user.currentAccountId = account.id

    return { token, user }
  },
)
