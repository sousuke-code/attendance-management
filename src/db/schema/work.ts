import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "./commmon";
import { teachers } from "./teacher";
import { attendaces } from "./attendance";

export const workRecords = pgTable("workRecord", {
    id: serial().primaryKey(),
    teacherId: integer().references(() => teachers.id),
    attendaceId: integer().references(() => attendaces.id),
    start: timestamp().notNull(),
    end: timestamp().notNull(),
    ...timestamps,
})

export const WorkRecords = typeof workRecords.$inferSelect;
