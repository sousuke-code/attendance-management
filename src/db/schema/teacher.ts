import { pgTable, serial, text, varchar,integer } from "drizzle-orm/pg-core";

export const teachers = pgTable('teacher', {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    email: text(),
    point: integer().default(0),
});

export type Teacher = typeof teachers.$inferSelect;

