import { inngest } from "@psre/tools";
import { CHAT_EVENTS } from "./chat.events";

const allianceChatId = "52b49c7a-5b8a-40b9-95af-c31be0c8e39b";
const regionChatId = "def67dc7-39ca-4f13-a816-6f53c115d869";
const testAccountId = "ba12e291-2e9c-452e-ae06-81c1a885390e";

export const testChat = () => {
  setInterval(() => {
    inngest.send({
      name: CHAT_EVENTS.MESSAGE_CREATED,
      data: {
        content: `reg ${crypto.randomUUID()}`,
        currentAccountId: testAccountId,
        chatId: regionChatId,
      },
    });

    inngest.send({
      name: CHAT_EVENTS.MESSAGE_CREATED,
      data: {
        content: `al ${crypto.randomUUID()}`,
        currentAccountId: testAccountId,
        chatId: allianceChatId,
      },
    });
  }, 500);

  setInterval(() => {
    inngest.send({
      name: CHAT_EVENTS.CHAT_CLEANUP,
      data: { chatId: regionChatId },
    });

    inngest.send({
      name: CHAT_EVENTS.CHAT_CLEANUP,
      data: { chatId: allianceChatId },
    });
  }, 10000);
};
