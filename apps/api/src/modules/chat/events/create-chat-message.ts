import { eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"

const HandlerName = "chat/create-message" as const

export type ChatCreateMessageHandler = {
  [K in typeof HandlerName]: {
    data: {
      content: string
      currentAccountId: string
      chatId: string
    }
  }
}

export const createChatMessage = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ event: { data }, step, db, dbSchema, pubsub }) => {
    const message = await step.run("create-message-event", async () => {
      const chatMessages = await db
        .insert(dbSchema.chatMessages)
        .values({
          content: data.content,
          authorId: data.currentAccountId,
          chatId: data.chatId,
        })
        .returning()

      const messageId = chatMessages[0]?.id

      if (!messageId) throw "Message not found"

      return db.query.chatMessages.findFirst({
        where: eq(dbSchema.chatMessages.id, messageId),
        columns: {
          id: true,
          content: true,
          createdAt: true,
        },
        with: {
          author: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      })
    })

    if (!message) return { success: false }

    await step.run("publish-message-event", async () => {
      pubsub.publish("createdChatMessage", data.chatId, message)
    })

    return { success: true }
  },
)
