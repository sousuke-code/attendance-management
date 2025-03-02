import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const teachers = pgTable('teacher', {
    id: serial().primaryKey(),
    name: varchar().notNull(),
});

export type Teacher = typeof teachers.$inferSelect;

