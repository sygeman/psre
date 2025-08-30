import 'dotenv/config';
import { drizzle } from "drizzle-orm/node-postgres";
import { reset } from "drizzle-seed";
import { Pool } from "pg";
import * as schema from './schema'

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

export const db = drizzle({ client: pool, schema });

export const dbSeed = async () => {
  await reset(db, schema);
}
