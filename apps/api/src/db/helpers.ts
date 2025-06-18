import { timestamp } from "drizzle-orm/pg-core";

export const schemaDateAtHelper = {
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }),
  deletedAt: timestamp({ withTimezone: true }),
}
