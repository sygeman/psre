import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { reset, seed } from "drizzle-seed";
import { Pool } from "pg";
import * as schema from './schema'
import { eq } from 'drizzle-orm';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle({ client: pool, schema });

export const dbSeed = async () => {
  await reset(db, schema);

  const users = await db.insert(schema.users).values({
    telegramId: '57902065'
  }).returning();

  const user = users[0]

  if (!user) return;

  const accounts = await db.insert(schema.accounts).values({
    userId: user.id,
    name: 'Sygeman'
  }).returning();

  const account = accounts[0]

  if (!account) return;

  console.log(account)

  await db.update(schema.users)
    .set({ currentAccountId: account.id })
    .where(eq(schema.accounts.id, account.id))
    .from(schema.accounts)
}
