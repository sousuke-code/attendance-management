import { pgTable, serial, text, varchar, integer,date,pgView,time } from "drizzle-orm/pg-core";
import { teachers } from "./teacher";
import { students } from "./student";
import { subjects } from "./subject";
import { timestamps } from "./commmon";
import { sql } from "drizzle-orm";
import { request } from "http";

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
    startTime: time(),
    endTime: time(),
});


export const fixedShifts = pgTable('fixedShift', {
    id: serial().primaryKey(),
    teacherId: integer().references(() => teachers.id),
    studentId : integer().references(() => students.id),
    weekday: integer(),
    shiftId: integer().references(() => shiftOptions.id),
    subject: integer().references(() => subjects.id),
})

export const shiftSwapLists = pgTable('shiftSwapList', {
    id: serial().primaryKey(),
    requesterId: integer().references(() => teachers.id),
    receiverId: integer().references(() => teachers.id),
    studentsId: integer().references(() => students.id),
    shiftId: integer().notNull().references(() => shifts.id),
    reason: text().notNull(),
    status: varchar({ enum: ['pending', 'approved', 'rejected','applying'] }).notNull(),
    ...timestamps,
})

export const shiftDetails = pgView('shiftDetail', {
    id: integer().notNull(),
    shiftDate: date().notNull(),
    shiftOptionId: integer().notNull(),
    shiftTime: varchar().notNull(),
    subjectId: integer().notNull(),
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
        s."subjectId" as "subjectId",
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

export const shiftSwapDetails = pgView('shiftSwapDetails', {
    id: integer().notNull(),
    requesterId: integer().notNull(),
    requesterName: varchar().notNull(),
    receiverId: integer().notNull(),
    receiverName: varchar().notNull(),
    studentId: integer().notNull(),
    studentName: varchar().notNull(),
    shiftId: integer().notNull(),
    shiftDate: date().notNull(),
    shiftTime: varchar().notNull(),
    shiftOptionId: integer().notNull(),
    subjectId: integer().notNull(),
    subjectsName: varchar().notNull(),
    reason: text().notNull(),
    status: varchar().notNull(),
    ...timestamps,
}).as(
    sql`
     SELECT
        ssl.id as id,
        ssl."requesterId" as "requesterId",
        t1.name as "requesterName",
        ssl."receiverId" as "receiverId",
        t2.name as "receiverName",
        ssl."studentsId" as "studentId",
        st.name as "studentName",
        ssl."shiftId" as "shiftId",
        s.date as "shiftDate",
        so."shiftTime" as "shiftTime",
        so.id as "shiftOptionId",
        s."subjectId" as "subjectId",
        su.name as "subjectsName",
        ssl.reason as reason,
        ssl.status as status,
        ssl."createdAt" as "createdAt",
        ssl."updatedAt" as "updatedAt"
    FROM ${shiftSwapLists} ssl
    LEFT JOIN ${teachers} t1 ON ssl."requesterId" = t1.id
    LEFT JOIN ${teachers} t2 ON ssl."receiverId" = t2.id
    LEFT JOIN ${students} st ON ssl."studentsId" = st.id
    LEFT JOIN ${shifts} s ON ssl."shiftId" = s.id
    LEFT JOIN ${shiftOptions} so ON s."shiftId" = so.id
    LEFT JOIN ${subjects} su ON s."subjectId" = su.id   
    `
)

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
export type ShiftOption = typeof shiftOptions.$inferSelect;
export type FixedShift = typeof fixedShifts.$inferSelect;
export type ShiftSwapList = typeof shiftSwapLists.$inferSelect;
export type ShiftSwapDetail = typeof shiftSwapDetails.$inferSelect;
