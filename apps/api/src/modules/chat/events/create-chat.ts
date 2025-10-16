import { inngest } from "@/lib/inngest"

const HandlerName = "chat/create" as const

export type ChatCreateHandler = {
  [K in typeof HandlerName]: {
    data?: undefined
  }
}

export const createChat = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ db, dbSchema }) => {
    const chats = await db.insert(dbSchema.chats).values({}).returning()
    const chat = chats[0]

    if (!chat) throw "Chat not found"

    return { chat }
  },
)
