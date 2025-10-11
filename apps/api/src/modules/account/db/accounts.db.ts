import { relations } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core"
import { users, regions, alliances } from "@/schema/db"

export const accounts = pgTable("accounts", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  deletedAt: t.timestamp({ withTimezone: true }),
  name: t.varchar().notNull(),
  userId: t.uuid().unique(),
  // Main Resources
  food: t.integer().default(0).notNull(),
  wood: t.integer().default(0).notNull(),
  steel: t.integer().default(0).notNull(),
  fuel: t.integer().default(0).notNull(),
  diamond: t.integer().default(0).notNull(),
  // Region, Alliance
  regionId: t.uuid(),
  allianceId: t.uuid(),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
  region: one(regions, {
    fields: [accounts.regionId],
    references: [regions.id],
  }),
  alliance: one(alliances, {
    fields: [accounts.allianceId],
    references: [alliances.id],
  }),
}))
