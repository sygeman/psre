import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./users";
import { schemaDateAtHelper } from "../schema.helpers";

export const accounts = pgTable('accounts', (t) => ({
  id: t.serial().primaryKey(),
  name: t.varchar(),
  userId: t.integer(),
  ...schemaDateAtHelper
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
}));
