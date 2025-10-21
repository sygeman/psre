import "dotenv/config"
import { type AnyColumn, sql } from "drizzle-orm"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "../schema/db"

const pool = new Pool({ connectionString: process.env.DATABASE_URL! })
export const db = drizzle({ client: pool, schema })

export const increment = (column: AnyColumn, value = 0) => {
  return sql`${column} + ${value}`
}

export const decrement = (column: AnyColumn, value = 0) => {
  return sql`${column} - ${value}`
}
