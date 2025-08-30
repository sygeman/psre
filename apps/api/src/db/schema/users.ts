import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { accounts } from "./accounts";

export const users = pgTable("users", (t) => ({
  id: t.serial().primaryKey(),
  telegramId: t.varchar().unique(),
  token: t.varchar().unique(),
  currentAccountId: t.integer(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  deletedAt: t.timestamp({ withTimezone: true }),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
	currentAccount: one(accounts, {
    fields: [users.currentAccountId],
    references: [accounts.id]
	}),
}));
