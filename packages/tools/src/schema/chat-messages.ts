import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { chats } from "./chats";
import { accounts } from "./accounts";
import { schemaDateAtHelper } from "../schema.helpers";

export const chatMessages = pgTable('chat-messages', (t) => ({
  id: t.serial().primaryKey(),
  content: t.text(),
  chatId: t.integer(),
  authorId: t.integer(),
  ...schemaDateAtHelper
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
