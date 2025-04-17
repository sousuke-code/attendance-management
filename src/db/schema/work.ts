import { pgTable, serial,text, integer, timestamp, pgView } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
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


export const workRecordDetails = pgView("workRecordDetail", {
    id: integer().notNull(),
    teacherId: integer(),
    teacherName: text(),
    content: text(),
    start: timestamp().notNull(),
    end: timestamp().notNull(),
}).as(
    sql`
      SELECT 
        wr.id as id,
        wr."teacherId" as "teacherId",
        t.name as "teacherName",
        wr.content as content,
        wr.start as start,
        wr.end as end
      FROM "workRecord" wr
      LEFT JOIN teacher t ON wr."teacherId" = t.id
    `)
  

export type WorkRecords = typeof workRecords.$inferSelect;
export type WorkRecordDetail = typeof workRecordDetails.$inferSelect;
