import { relations } from "drizzle-orm";
import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import { accounts } from "./accounts";
import { chats } from "./chats";

export const regions = pgTable('regions', (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  deletedAt: t.timestamp({ withTimezone: true }),
  chatId: t.uuid(),
}))

export const regionsRelations = relations(regions, ({ many, one }) => ({
  accounts: many(accounts),
  chat: one(chats, {
		fields: [regions.chatId],
		references: [chats.id],
	}),
}));
