import { reset } from "drizzle-seed"
import { inngest } from "@/lib/inngest"
import {
  createAlliance,
  createChatMessage,
  createRegion,
  createUser,
} from "@/schema/events"

export const seed = inngest.createFunction(
  { id: "global-seed" },
  { event: "global/seed" },
  async ({ event: { data }, step, db, dbSchema }) => {
    await step.run("reset-db", async () => {
      return await reset(db, dbSchema)
    })

    const { region } = await step.invoke("create-first-region", {
      function: createRegion,
    })

    const { user } = await step.invoke("create-first-user", {
      function: createUser,
      data: { telegramId: data.telegramId, name: data.name },
    })

    if (!user.currentAccountId) throw "currentAccountId is null"

    const { alliance } = await step.invoke("create-first-alliance", {
      function: createAlliance,
      data: { regionId: region.id, ownerId: user.currentAccountId },
    })

    if (!region.chatId || !alliance.chatId) throw "chatId is null"

    await Promise.all([
      step.invoke("send-message-to-region-chat", {
        function: createChatMessage,
        data: {
          content: "Всем привет в регионе",
          currentAccountId: user.currentAccountId,
          chatId: region.chatId,
        },
      }),
      step.invoke("send-message-to-alliance-chat", {
        function: createChatMessage,
        data: {
          content: "Всем привет в альянсе",
          currentAccountId: user.currentAccountId,
          chatId: alliance.chatId,
        },
      }),
    ])
  },
)
