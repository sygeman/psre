import { inngest, pubsub } from "@psre/tools";
import { CHAT_EVENTS, CHAT_FUNCTION_IDS } from "../chat.events";
import { createMessage } from "api/service/create-message";

export const chatMessageCreatedEventHandler = inngest.createFunction(
  { id: CHAT_FUNCTION_IDS.MESSAGE_HANDLER },
  { event: CHAT_EVENTS.MESSAGE_CREATED },
  async ({ event, step }) => {
    const data = event.data;

    const message = await step.run("create-message-event", () => {
      return createMessage({
        authorId: data.currentAccountId,
        chatId: data.chatId,
        content: data.content,
      });
    });

    await step.run("publish-message-event", async () => {
      pubsub.publish("createdChatMessage", data.chatId, message);
    });

    return { success: true };
  },
);
