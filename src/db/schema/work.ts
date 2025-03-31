import { pgTable, serial,text, integer, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "./commmon";
import { teachers } from "./teacher";
import { attendaces } from "./attendance";

export const workRecords = pgTable("workRecord", {
    id: serial().primaryKey(),
    teacherId: integer().references(() => teachers.id),
    attendaceId: integer().references(() => attendaces.id),
    content: text(),
    start: timestamp().notNull(),
    end: timestamp().notNull(),
    ...timestamps,
})

export const WorkRecords = typeof workRecords.$inferSelect;
