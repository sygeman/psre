import { relations } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core"
import { accounts } from "@/schema/db"
import { ITEMS } from "@/schema/items"

export const items = pgTable("items", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  deletedAt: t.timestamp({ withTimezone: true }),
  ownerId: t.uuid().notNull(),
  type: t.varchar({ enum: ITEMS }).notNull(),
  count: t.integer().default(0).notNull(),
}))

export const itemsRelations = relations(items, ({ one }) => ({
  owner: one(accounts, {
    fields: [items.ownerId],
    references: [accounts.id],
  }),
}))
