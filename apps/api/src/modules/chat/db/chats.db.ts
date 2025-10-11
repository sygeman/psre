import { relations } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core"
import { chatMessages, regions, alliances } from "@/schema/db"

export const chats = pgTable("chats", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  deletedAt: t.timestamp({ withTimezone: true }),
}))

export const chatsRelations = relations(chats, ({ many }) => ({
  messages: many(chatMessages),
  region: many(regions),
  alliance: many(alliances),
}))
