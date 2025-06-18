import { timestamp } from "drizzle-orm/pg-core";

export const schemaDateAtHelper = {
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
  deletedAt: timestamp(),
}
