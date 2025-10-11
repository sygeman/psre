import { inngest } from "@/lib/inngest";
import { createRegion } from '@/modules/region/service/create-region';
import { createAlliance } from '@/modules/alliance/service/create-alliance';
import { GLOABAL_EVENTS, GLOABAL_FUNCTION_IDS } from "../global.events";
import { createUser } from "@/modules/user/events/create-user";
import { reset } from "drizzle-seed";
import { chatMessageCreatedEventHandler } from "@/modules/chat/events/chat-message-created";

export const seedEventHandler = inngest.createFunction(
  { id: GLOABAL_FUNCTION_IDS.SEED_HANDLER },
  { event: GLOABAL_EVENTS.SEED },
  async ({ event: { data }, step, db, dbSchema }) => {
    await step.run('reset-db', async () => {
      return await reset(db, dbSchema);
    })

    const { region } = await step.invoke("create-first-region", {
      function: createRegion,
    });

    const { user } = await step.invoke("create-first-user", {
      function: createUser,
      data: { telegramId: data.telegramId, name: data.name }
    })

    if (!user.currentAccountId) throw 'currentAccountId is null';

    const { alliance } = await step.invoke("create-first-alliance", {
      function: createAlliance,
      data: { regionId: region.id, ownerId: user.currentAccountId }
    });

    await Promise.all([
      step.invoke('send-message-to-region-chat', {
        function: chatMessageCreatedEventHandler,
        data: {
          content: 'Всем привет в регионе',
          currentAccountId: user.currentAccountId,
          chatId: region.chatId,
        }
      }),
      step.invoke('send-message-to-alliance-chat', {
        function: chatMessageCreatedEventHandler,
        data: {
          content: 'Всем привет в альянсе',
          currentAccountId: user.currentAccountId,
          chatId: alliance.chatId,
        }
      })
    ]);
  },
);
