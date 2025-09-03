import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { reset } from "drizzle-seed";
import { Pool } from "pg";
import * as schema from './schema'
import { createUser } from '@/modules/user/service/create-user';

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

export const db = drizzle({ client: pool, schema });

export const dbSeed = async () => {
  await reset(db, schema);

  // Create region 1 (+chat 1)
  await createUser({ telegramId: 57902065 })
  // Add Account 1 to region 1
  // Account 1 create alliance 1 (+chat 2)
}
