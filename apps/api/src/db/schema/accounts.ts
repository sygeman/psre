import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./users";
import { regions } from "./regions";
import { alliances } from "./alliances";

export const accounts = pgTable('accounts', (t) => ({
  id: t.serial().primaryKey(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  deletedAt: t.timestamp({ withTimezone: true }),
  name: t.varchar(),
  userId: t.integer().unique(),
  // Main Resources
  food: t.integer().default(0).notNull(),
  wood: t.integer().default(0).notNull(),
  steel: t.integer().default(0).notNull(),
  fuel: t.integer().default(0).notNull(),
  diamond: t.integer().default(0).notNull(),
  // Region, Alliance
  regionId: t.integer(),
  allianceId: t.integer(),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
	region: one(regions, {
		fields: [accounts.userId],
		references: [regions.id],
	}),
	alliance: one(alliances, {
		fields: [accounts.userId],
		references: [alliances.id],
	}),
}));
