import { relations } from "drizzle-orm";
import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import { accounts } from "./accounts";
import { chats } from "./chats";

export const alliances = pgTable('alliances', (t) => ({
  id: t.serial().primaryKey(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  deletedAt: t.timestamp({ withTimezone: true }),
  chatId: t.integer(),
}))

export const alliancesRelations = relations(alliances, ({ many, one }) => ({
  accounts: many(accounts),
  chat: one(chats, {
		fields: [alliances.chatId],
		references: [chats.id],
	}),
}));
