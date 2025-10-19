import { relations } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core"
import { accounts } from "@/schema/db"

export const buildings = pgTable("buildings", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  deletedAt: t.timestamp({ withTimezone: true }),
  collectedAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  level: t.integer().default(1).notNull(),
  ownerId: t.uuid(),
  type: t.varchar().notNull(),
}))

export const buildingsRelations = relations(buildings, ({ one }) => ({
  owner: one(accounts, {
    fields: [buildings.ownerId],
    references: [accounts.id],
  }),
}))
