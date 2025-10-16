import { reset } from "drizzle-seed"
import { inngest } from "@/lib/inngest"
import {
  collectBuilding,
  createAlliance,
  createBuilding,
  createChatMessage,
  createRegion,
  createUser,
} from "@/schema/events"

const HandlerName = "global/seed" as const

export type GlobalSeedHandler = {
  [K in typeof HandlerName]: {
    data: {
      telegramId: string
      name: string
    }
  }
}

export const seed = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
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

    await Promise.all([
      step.invoke("create-building", {
        function: createBuilding,
        data: {
          accountId: user.currentAccountId,
          type: "farm",
        },
      }),
      step.invoke("create-building", {
        function: createBuilding,
        data: {
          accountId: user.currentAccountId,
          type: "farm",
        },
      }),
      step.invoke("create-building", {
        function: createBuilding,
        data: {
          accountId: user.currentAccountId,
          type: "lumber-mill",
        },
      }),
      step.invoke("create-building", {
        function: createBuilding,
        data: {
          accountId: user.currentAccountId,
          type: "steel-plant",
        },
      }),
      step.invoke("create-building", {
        function: createBuilding,
        data: {
          accountId: user.currentAccountId,
          type: "gas-field",
        },
      }),
    ])

    await step.invoke("collect-building", {
      function: collectBuilding,
      data: {
        accountId: user.currentAccountId,
        type: "farm",
      },
    })

    await step.sleep("wait-5s", 5000)

    await step.invoke("collect-building", {
      function: collectBuilding,
      data: {
        accountId: user.currentAccountId,
        type: "lumber-mill",
      },
    })
  },
)
