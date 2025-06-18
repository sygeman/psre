import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { accounts } from "./accounts";
import { schemaDateAtHelper } from "../schema.helpers";

export const users = pgTable("users", (t) => ({
  id: t.serial().primaryKey(),
  telegramId: t.varchar().unique(),
  currentAccountId: t.integer(),
  ...schemaDateAtHelper
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
	currentAccount: one(accounts, {
    fields: [users.currentAccountId],
    references: [accounts.id]
	}),
}));
