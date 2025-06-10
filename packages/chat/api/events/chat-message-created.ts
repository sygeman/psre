import { inngest, pubsub } from "@psre/tools";
import { SendMessageInput } from "@psre/types";
import { CHAT_EVENTS, CHAT_FUNCTION_IDS } from "../chat.events";

export const chatMessageCreatedEventHandler = inngest.createFunction(
  { id: CHAT_FUNCTION_IDS.MESSAGE_HANDLER },
  { event: CHAT_EVENTS.MESSAGE_CREATED },
  async ({ event, step }) => {
    const data = event.data as SendMessageInput;

    const message = await step.run("create-message-event", () => {
      return {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      };
    });

    await step.run("publish-message-event", async () => {
      pubsub.publish("createdChatMessage", data.chatId, message);
    });

    return { success: true };
  },
);
