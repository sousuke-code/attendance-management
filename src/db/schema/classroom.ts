import { pgTable, serial, text,integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const classRooms = pgTable('classRoom', {
    id: serial().primaryKey(),
    name: text().notNull(),
    capacity: integer().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
})


export type ClassRoom = typeof classRooms.$inferSelect;
