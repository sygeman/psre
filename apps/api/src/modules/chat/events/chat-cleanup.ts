import { inngest } from "@/lib/inngest";
import { pubsub } from "@/lib/pubsub";
import { CHAT_EVENTS, CHAT_FUNCTION_IDS } from "../chat.events";
import { chatCleanup } from "../service/chat-cleanup";

export const chatCleanupEventHandler = inngest.createFunction(
  { id: CHAT_FUNCTION_IDS.CHAT_CLEANUP_HANDLER },
  { event: CHAT_EVENTS.CHAT_CLEANUP },
  async ({ event, step }) => {
    const data = event.data;

    await step.run("cleanup-messages-in-db", () => {
      return chatCleanup({ chatId: data.chatId });
    });

    await step.run("publish-cleanup-event", async () => {
      pubsub.publish("chatCleanup", data.chatId, true);
    });

    return { success: true };
  },
);
