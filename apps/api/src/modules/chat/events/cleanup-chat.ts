import { eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"

export const cleanupChat = inngest.createFunction(
  { id: "chat-cleanup" },
  { event: "chat/cleanup" },
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
