import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { chats } from "./chats";
import { accounts } from "./accounts";

export const chatMessages = pgTable('chat-messages', (t) => ({
  id: t.serial().primaryKey(),
  content: t.text(),
  chatId: t.integer(),
  authorId: t.integer(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  deletedAt: t.timestamp({ withTimezone: true }),
}))

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
	chat: one(chats, {
		fields: [chatMessages.chatId],
		references: [chats.id],
	}),
	author: one(accounts, {
		fields: [chatMessages.authorId],
		references: [accounts.id],
	}),
}));
