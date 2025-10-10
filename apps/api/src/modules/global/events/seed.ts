import { inngest } from "@/lib/inngest";
import { createRegion } from '@/modules/region/service/create-region';
import { createAlliance } from '@/modules/alliance/service/create-alliance';
import { GLOABAL_EVENTS, GLOABAL_FUNCTION_IDS } from "../global.events";
import { createUser } from "@/modules/user/events/create-user";

export const seedEventHandler = inngest.createFunction(
  { id: GLOABAL_FUNCTION_IDS.SEED_HANDLER },
  { event: GLOABAL_EVENTS.SEED },
  async ({ event, step }) => {
    const data = event.data;

    const { region } = await step.invoke("create-first-region", {
      function: createRegion,
    });

    const { user } = await step.invoke("create-first-user", {
      function: createUser,
      data: { telegramId: data.telegramId, name: data.name }
    })

    if (!user.currentAccountId) throw 'currentAccountId is null';

    await step.invoke("create-first-alliance", {
      function: createAlliance,
      data: { regionId: region.id, ownerId: user.currentAccountId }
    });
  },
);
