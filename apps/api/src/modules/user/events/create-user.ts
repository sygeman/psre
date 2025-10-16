import { eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"
import { createAccount } from "@/schema/events"
import { generateToken } from "../service/generate-token"

const HandlerName = "user/create" as const

export type CreateUserHandler = {
  [K in typeof HandlerName]: {
    data: {
      telegramId: string
      token?: string
      name?: string
    }
  }
}

export const createUser = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ event, step, db, dbSchema }) => {
    let { telegramId, token, name } = event.data

    let user = await step.run("find-user-in-db", () => {
      return db.query.users.findFirst({
        where: (users, { eq }) => eq(users.telegramId, telegramId),
      })
    })

    if (user) {
      if (!token) {
        token = await step.run("regenerate-token", async () => {
          const token = generateToken()

          await db
            .update(dbSchema.users)
            .set({ token })
            .where(eq(dbSchema.users.id, user.id))

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
        .values({ telegramId, token })
        .returning()

      return users[0]
    })

    if (!user) throw "User not found"

    const { account } = await step.invoke("create-account", {
      function: createAccount,
      data: { name, userId: user.id },
    })

    user.currentAccountId = account.id

    return { token, user }
  },
)
