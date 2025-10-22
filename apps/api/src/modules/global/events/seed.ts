import { reset } from "drizzle-seed"
import { inngest } from "@/lib/inngest"
import {
  collectBuilding,
  createAlliance,
  createBuilding,
  createChatMessage,
  createRegion,
  createUser,
  upgradeBuilding,
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

    const [createdBuildings] = await Promise.all([
      step.invoke("create-building", {
        function: createBuilding,
        data: {
          accountId: user.currentAccountId,
          buildings: [
            { type: "farm" },
            { type: "lumber-mill" },
            { type: "steel-plant" },
            { type: "gas-field" },
          ],
        },
      }),
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

    const firstCreatedBuilding = createdBuildings[0]

    if (!firstCreatedBuilding) throw "firstCreatedBuilding not found"

    await step.sleep("wait-5s", 5000)

    await step.invoke("collect-building", {
      function: collectBuilding,
      data: {
        accountId: user.currentAccountId,
        type: "lumber-mill",
      },
    })

    step.invoke("upgrade-building", {
      function: upgradeBuilding,
      data: {
        accountId: user.currentAccountId,
        buildingId: firstCreatedBuilding.id,
      },
    })

    await step.sleep("wait-5s", 5000)

    await step.run("boost-1m", async () => {
      await inngest.send({
        name: "building/boost",
        data: {
          accountId: user.currentAccountId,
          buildingId: firstCreatedBuilding.id,
          timeMs: 60 * 1000,
        },
      })
    })

    await step.sleep("wait-5s", 5000)

    await step.run("boost-30s", async () => {
      await inngest.send({
        name: "building/boost",
        data: {
          accountId: user.currentAccountId,
          buildingId: firstCreatedBuilding.id,
          timeMs: 30 * 1000,
        },
      })
    })
  },
)
