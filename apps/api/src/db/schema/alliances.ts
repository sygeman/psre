import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { accounts } from "./accounts";
import { chats } from "./chats";
import { regions } from "./regions";
import { users } from "./users";

export const alliances = pgTable('alliances', (t) => ({
  id: t.serial().primaryKey(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  deletedAt: t.timestamp({ withTimezone: true }),
  chatId: t.integer(),
  regionId: t.integer(),
  ownerId: t.integer(),
}))

export const alliancesRelations = relations(alliances, ({ many, one }) => ({
  accounts: many(accounts),
  chat: one(chats, {
		fields: [alliances.chatId],
		references: [chats.id],
	}),
  region: one(regions, {
		fields: [alliances.regionId],
		references: [regions.id],
	}),
  owner: one(users, {
		fields: [alliances.ownerId],
		references: [users.id],
	}),
}));
