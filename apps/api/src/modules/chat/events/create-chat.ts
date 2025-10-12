import { inngest } from "@/lib/inngest"

export const createChat = inngest.createFunction(
  { id: "create-chat" },
  { event: "chat/create" },
  async ({ db, dbSchema }) => {
    const chats = await db.insert(dbSchema.chats).values({}).returning()
    const chat = chats[0]

    if (!chat) throw "Chat not found"

    return { chat }
  },
)
