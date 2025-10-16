import { eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"
import { createChat } from "@/schema/events"

const HandlerName = "alliance/create" as const

export type AllianceCreateHandler = {
  [K in typeof HandlerName]: {
    data: {
      regionId: string
      ownerId: string
    }
  }
}

export const createAlliance = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({
    event: {
      data: { regionId, ownerId },
    },
    step,
    db,
    dbSchema,
  }) => {
    const { chat } = await step.invoke("create-chat-for-alliance", {
      function: createChat,
    })

    const alliances = await db
      .insert(dbSchema.alliances)
      .values({
        chatId: chat.id,
        regionId,
        ownerId,
      })
      .returning()
    const alliance = alliances[0]

    if (!alliance) throw "Alliance not found"

    await db
      .update(dbSchema.accounts)
      .set({ allianceId: alliance.id })
      .where(eq(dbSchema.accounts.id, ownerId))

    return { alliance }
  },
)
