import { createItem } from "@directus/sdk";
import { directus } from "../../lib/directus";
import { inngest } from "../client";
import { CronTime } from "cron-time-generator";
import { allianceMessages, regionMessages } from "../mocks/messages";

export default inngest.createFunction(
    { id: "test-random-chat-message" },
    { cron: `TZ=Europe/Moscow ${CronTime.everyMinute()}` },
    async () => {

      const accountId = 'ba12e291-2e9c-452e-ae06-81c1a885390e';
      const regionChatId = 'def67dc7-39ca-4f13-a816-6f53c115d869'
      const allianceChatId = '52b49c7a-5b8a-40b9-95af-c31be0c8e39b'

      await directus.request(createItem('psre_chat_message', {
          chat_id: regionChatId,
          content: regionMessages[Math.floor(Math.random() * regionMessages.length)],
          author: accountId
      }));

      await directus.request(createItem('psre_chat_message', {
        chat_id: allianceChatId,
        content: allianceMessages[Math.floor(Math.random() * allianceMessages.length)],
        author: accountId
      }));

    }
  );