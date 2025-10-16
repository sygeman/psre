import { eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"

const HandlerName = "chat/cleanup" as const

export type ChatCleanupHandler = {
  [K in typeof HandlerName]: {
    data: {
      chatId: string
    }
  }
}

export const cleanupChat = inngest.createFunction(
  { id: HandlerName.replace("/", "-") },
  { event: HandlerName },
  async ({ event: { data }, step, db, dbSchema, pubsub }) => {
    await step.run("cleanup-messages-in-db", () => {
      return db
        .delete(dbSchema.chatMessages)
        .where(eq(dbSchema.chatMessages.chatId, data.chatId))
    })

    await step.run("publish-cleanup-event", async () => {
      pubsub.publish("cleanupChat", data.chatId, true)
    })

    return { success: true }
  },
)
