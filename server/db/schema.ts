import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 256 }).notNull(),
  timezone: varchar("timezone", { length: 50 }).notNull().default("UTC"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
