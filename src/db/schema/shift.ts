import { pgTable, serial, text, varchar, integer,date,pgView } from "drizzle-orm/pg-core";
import { teachers } from "./teacher";
import { students } from "./student";
import { subjects } from "./subject";
import { timestamps } from "./commmon";
import { sql } from "drizzle-orm";

export const shifts = pgTable('shift', {
    id: serial().primaryKey(),
    teacherId: integer().references(() => teachers.id),
    studentId: integer().notNull().references(() => students.id),
    date: date().notNull(),
    shiftId: integer().notNull().references(() => shiftOptions.id),
    subjectId: integer().notNull().references(() => subjects.id),
    ...timestamps,
})

export const shiftOptions = pgTable('shiftOption', {
    id: serial().primaryKey(),
    shiftTime: varchar().notNull(),
});

export const shiftSwapLists = pgTable('shiftSwapList', {
    id: serial().primaryKey(),
    requesterId: integer().references(() => teachers.id),
    receiverId: integer().references(() => teachers.id),
    studentsId: integer().references(() => students.id),
    shiftId: integer().notNull().references(() => shifts.id),
    reason: text().notNull(),
    status: varchar({ enum: ['pending', 'approved', 'rejected','applying'] }).notNull(),
})

export const shiftDetails = pgView('shiftDetail', {
    id: integer().notNull(),
    shiftDate: date().notNull(),
    shiftOptionId: integer().notNull(),
    shiftTime: varchar().notNull(),
    subjectName: varchar().notNull(),
    teacherId: integer().notNull(),
    teacherName: varchar().notNull(),
    teacherEmail: varchar().notNull(),
    studentName: varchar().notNull(),
}).as(
    sql `
    SELECT
        s.id as id,
        s.date as "shiftDate",
        so.id as "shiftOptionId",
        so."shiftTime" as "shiftTime",
        su.name as "subjectName",
        t.id as "teacherId",
        t.name as "teacherName",
        t.email as "teacherEmail",
        st.name as "studentName"
    FROM ${shifts} s
    LEFT JOIN ${shiftOptions} so ON s."shiftId" = so.id
    LEFT JOIN ${students} st ON s."studentId" = st.id
    LEFT JOIN ${subjects} su ON s."subjectId" = su.id
    LEFT JOIN ${teachers} t ON s."teacherId" = t.id
    `
);

export interface ShiftSwapListInfo extends ShiftSwapList {
    requesterName: string | null;
    receiverName: string | null;
    studentName: string | null;
    shiftDate: string | null;
    shiftTime: string | null;
    subjectsName: string | null;
    date: string | null;
}

export type ShiftDetail = typeof shiftDetails.$inferSelect;
export type Shift = typeof shifts.$inferSelect;
export type ShiftSwapList = typeof shiftSwapLists.$inferSelect;
