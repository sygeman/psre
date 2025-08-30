import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./users";

export const accounts = pgTable('accounts', (t) => ({
  id: t.serial().primaryKey(),
  name: t.varchar(),
  userId: t.integer().unique(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  deletedAt: t.timestamp({ withTimezone: true }),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
}));
