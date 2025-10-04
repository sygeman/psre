import { inngest } from "@/lib/inngest";
import { createUser } from '@/modules/user/service/create-user';
import { createRegion } from '@/modules/region/service/create-region';
import { createAlliance } from '@/modules/alliance/service/create-alliance';
import { renameAccount } from '@/modules/account/service/rename-account';
import { GLOABAL_EVENTS, GLOABAL_FUNCTION_IDS } from "../global.events";

export const seedEventHandler = inngest.createFunction(
  { id: GLOABAL_FUNCTION_IDS.SEED_HANDLER },
  { event: GLOABAL_EVENTS.SEED },
  async ({ event, step }) => {
    const data = event.data;

    const { region } = await step.invoke("create-first-region", {
      function: createRegion,
    });

    const { user } = await step.run("first-user", () => createUser({ telegramId: data.telegramId }));

    await Promise.all([
      step.run("rename-account", async () => {
        if (!user.currentAccountId) throw 'currentAccountId is null';
        return renameAccount({ accountId: user.currentAccountId, name: data.name });
      }),
      step.run("create-alliance", async () => {
        if (!user.currentAccountId) throw 'currentAccountId is null';
        return createAlliance({ regionId: region.id, ownerId: user.currentAccountId });
      })
    ]);
  },
);
