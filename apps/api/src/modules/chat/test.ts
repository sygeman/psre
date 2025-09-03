import { inngest } from "@/lib/inngest";
import { CHAT_EVENTS } from "./chat.events";

const sendCd = 500;
const cleanupCd = 10000;

export const testChat = ({ regionChatId, allianceChatId, testAccountId }) => {
  let ali = 0;
  let regi = 0;

  setInterval(() => {
    inngest.send({
      name: CHAT_EVENTS.MESSAGE_CREATED,
      data: {
        content: `reg ${regi++}`,
        currentAccountId: testAccountId,
        chatId: regionChatId,
      },
    });

    inngest.send({
      name: CHAT_EVENTS.MESSAGE_CREATED,
      data: {
        content: `al ${ali++}`,
        currentAccountId: testAccountId,
        chatId: allianceChatId,
      },
    });
  }, sendCd);

  setInterval(() => {
    regi = 0;
    ali = 0;
    inngest.send({
      name: CHAT_EVENTS.CHAT_CLEANUP,
      data: { chatId: regionChatId },
    });

    inngest.send({
      name: CHAT_EVENTS.CHAT_CLEANUP,
      data: { chatId: allianceChatId },
    });
  }, cleanupCd);
};
