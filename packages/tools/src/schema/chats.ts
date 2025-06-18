import { relations } from "drizzle-orm";
import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import { chatMessages } from "./chat-messages";
import { schemaDateAtHelper } from "../schema.helpers";

export const chatTypeEnum = pgEnum('type', ['state', 'alliance'])

export const chats = pgTable('chats', (t) => ({
  id: t.serial().primaryKey(),
  type: chatTypeEnum(),
  ...schemaDateAtHelper
}))

export const chatsRelations = relations(chats, ({ many }) => ({
  messages: many(chatMessages),
}));
