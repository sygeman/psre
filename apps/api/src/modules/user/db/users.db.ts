import { relations } from "drizzle-orm"
import { pgTable } from "drizzle-orm/pg-core"
import { accounts } from "@/schema/db"

export const users = pgTable("users", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  telegramId: t.varchar().unique(),
  token: t.varchar().unique(),
  currentAccountId: t.uuid(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  deletedAt: t.timestamp({ withTimezone: true }),
}))

export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: many(accounts),
  currentAccount: one(accounts, {
    fields: [users.currentAccountId],
    references: [accounts.id],
  }),
}))
