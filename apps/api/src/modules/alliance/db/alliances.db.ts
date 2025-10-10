import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { accounts, chats, regions } from "@/schema/db";

export const alliances = pgTable('alliances', (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  deletedAt: t.timestamp({ withTimezone: true }),
  chatId: t.uuid(),
  regionId: t.uuid(),
  ownerId: t.uuid(),
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
  owner: one(accounts, {
		fields: [alliances.ownerId],
		references: [accounts.id],
	}),
}));
