import { inngest } from "@/lib/inngest";
import { pubsub } from "@/lib/pubsub";
import { CHAT_EVENTS, CHAT_FUNCTION_IDS } from "../chat.events";
import { db } from "@/db";
import { chatMessages as chatMessagesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const chatMessageCreatedEventHandler = inngest.createFunction(
  { id: CHAT_FUNCTION_IDS.MESSAGE_HANDLER },
  { event: CHAT_EVENTS.MESSAGE_CREATED },
  async ({ event, step }) => {
    const data = event.data;

    const message = await step.run("create-message-event", async () => {
      const chatMessages = await db.insert(chatMessagesTable).values({
        content: data.content,
        authorId: data.currentAccountId,
        chatId: data.chatId
      }).returning();

      const messageId = chatMessages[0]?.id;

      if (!messageId) throw 'Message not found';

      return db.query.chatMessages.findFirst({
        where: eq(chatMessagesTable.id, messageId),
        columns: {
          id: true,
          content: true,
          createdAt: true
        },
        with: {
          author: {
            columns: {
              id: true,
              name: true
            }
          }
        }
      })
    });

    if (!message) return { success: false };

    await step.run("publish-message-event", async () => {
      pubsub.publish("createdChatMessage", data.chatId, message);
    });

    return { success: true };
  },
);
