import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const students = pgTable('student', {
    id: serial().primaryKey(),
    name : varchar().notNull(),
})


export type Student = typeof students.$inferSelect;
