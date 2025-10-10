import { users as usersTable } from "@/db/schema/users";
import { accounts as accountsTable } from "@/db/schema/accounts";
import { eq } from "drizzle-orm";
import { getLatestRegion } from "@/modules/region/service/get-latest-region";
import { ACCOUNT_EVENTS, ACCOUNT_FUNCTION_IDS } from "../account.events";
import { inngest } from "@/lib/inngest";

export const createAccount = inngest.createFunction(
  { id: ACCOUNT_FUNCTION_IDS.CREATE_HANDLER },
  { event: ACCOUNT_EVENTS.CREATE },
  async ({ event, step, db }) => {
    let { userId, regionId, name } = event.data;

    if (!regionId) {
      regionId = await step.run("get-latest-region-id", async () => {
        const { region } = await getLatestRegion();
        return region.id;
      });
    }

    if (!regionId) {
      throw "Region not found";
    }

    const account = await step.run("create-account-in-db", async () => {
      const accounts = await db
        .insert(accountsTable)
        .values({
          userId,
          regionId,
          name: name || crypto.randomUUID().toString(),
        })
        .returning();

      return accounts[0];
    });

    if (!account) throw "Account not found";

    await step.run("update-current-account-id", async () => {
      return db
        .update(usersTable)
        .set({ currentAccountId: account.id })
        .where(eq(usersTable.id, userId));
    });

    return { account };
  }
);
