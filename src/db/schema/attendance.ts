import { pgTable, serial, integer,timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "./commmon";
import { teachers } from "./teacher";

export const attendaces = pgTable("attendace", {
    id: serial().primaryKey(),
    teacherId: integer().references(() => teachers.id),
    checkIn: timestamp().notNull(),
    checkOut: timestamp().notNull(),
    ...timestamps,
})


export const Attendances = typeof attendaces.$inferSelect;
