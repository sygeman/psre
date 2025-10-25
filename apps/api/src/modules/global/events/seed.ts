import { and, eq } from "drizzle-orm"
import { reset } from "drizzle-seed"
import { increment } from "@/lib/drizzle"
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
  { id: HandlerName.replace("/", "-"), concurrency: 1 },
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

    const currentAccountId = user.currentAccountId
    if (currentAccountId === null) throw "currentAccountId is null"

    const { alliance } = await step.invoke("create-first-alliance", {
      function: createAlliance,
      data: { regionId: region.id, ownerId: currentAccountId },
    })

    if (!region.chatId || !alliance.chatId) throw "chatId is null"

    const [createdBuildings] = await Promise.all([
      step.invoke("create-building", {
        function: createBuilding,
        data: {
          accountId: currentAccountId,
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
          currentAccountId: currentAccountId,
          chatId: region.chatId,
        },
      }),
      step.invoke("send-message-to-alliance-chat", {
        function: createChatMessage,
        data: {
          content: "Всем привет в альянсе",
          currentAccountId: currentAccountId,
          chatId: alliance.chatId,
        },
      }),
    ])

    const firstCreatedBuilding = createdBuildings[0]

    if (!firstCreatedBuilding) throw "firstCreatedBuilding not found"

    await step.sleep("wait-2s", 200)

    await step.invoke("collect-building", {
      function: collectBuilding,
      data: {
        accountId: currentAccountId,
        type: "lumber-mill",
      },
    })

    await step.run("add-2-speedups", async () => {
      const result = await db
        .update(dbSchema.items)
        .set({
          count: increment(dbSchema.items.count, 2),
        })
        .where(
          and(
            eq(dbSchema.items.ownerId, currentAccountId),
            eq(dbSchema.items.type, "speedup-build-1m"),
          ),
        )
        .returning()

      if (result.length > 0) return result

      return await db
        .insert(dbSchema.items)
        .values({
          ownerId: currentAccountId,
          type: "speedup-build-1m",
          count: 2,
        })
        .returning()
    })

    await step.run("update-with-boost", async () => {
      await inngest.send({
        name: "building/upgrade",
        data: {
          accountId: currentAccountId,
          buildingId: firstCreatedBuilding.id,
        },
      })

      await inngest.send({
        name: "building/boost",
        data: {
          accountId: currentAccountId,
          buildingId: firstCreatedBuilding.id,
          speedup: "speedup-build-1m",
        },
      })

      await inngest.send({
        name: "building/boost",
        data: {
          accountId: currentAccountId,
          buildingId: firstCreatedBuilding.id,
          speedup: "speedup-build-1m",
        },
      })
    })
  },
)
