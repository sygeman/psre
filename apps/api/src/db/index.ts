import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { reset } from "drizzle-seed";
import { Pool } from "pg";
import * as schema from './schema'
import { createUser } from '@/modules/user/service/create-user';
import { createRegion } from '@/modules/region/service/create-region';
import { createAlliance } from '@/modules/alliance/service/create-alliance';
import { testChat } from '@/modules/chat/test';
import { renameAccount } from '@/modules/account/service/rename-account';

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

export const db = drizzle({ client: pool, schema });

export const dbSeed = async () => {
  await reset(db, schema);

  const { region } = await createRegion();
  const { user } = await createUser({ telegramId: 57902065 });

  if (!user.currentAccountId) throw 'currentAccountId is null';

  await renameAccount({ accountId: user.currentAccountId, name: 'Sygeman' });
  const { alliance } = await createAlliance({ regionId: region.id, ownerId: user.currentAccountId });

  testChat({
    allianceChatId: alliance.chatId,
    regionChatId: region.chatId,
    testAccountId: user.currentAccountId
  });
}
