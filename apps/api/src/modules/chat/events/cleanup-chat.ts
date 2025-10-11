import { eq } from "drizzle-orm"
import { inngest } from "@/lib/inngest"
import { CHAT_EVENTS, CHAT_FUNCTION_IDS } from "../chat.events"

export const cleanupChat = inngest.createFunction(
  { id: CHAT_FUNCTION_IDS.CHAT_CLEANUP_HANDLER },
  { event: CHAT_EVENTS.CHAT_CLEANUP },
  async ({ event: { data }, step, db, dbSchema, pubsub }) => {
    await step.run("cleanup-messages-in-db", () => {
      return db.delete(dbSchema.chatMessages).where(eq(dbSchema.chatMessages.chatId, data.chatId))
    })

    await step.run("publish-cleanup-event", async () => {
      pubsub.publish("cleanupChat", data.chatId, true)
    })

    return { success: true }
  },
)
