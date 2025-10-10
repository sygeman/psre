import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { chats, accounts } from "@/schema/db";

export const chatMessages = pgTable('chat-messages', (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  content: t.text(),
  chatId: t.uuid(),
  authorId: t.uuid(),
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
