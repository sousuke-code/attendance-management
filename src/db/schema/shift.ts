import { pgTable, serial, text, varchar, integer,date } from "drizzle-orm/pg-core";
import { teachers } from "./teacher";
import { students } from "./student";
import { subjects } from "./subject";
import { timestamps } from "./commmon";

export const shifts = pgTable('shift', {
    id: serial().primaryKey(),
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
    status: varchar({ enum: ['pending', 'approved', 'rejected'] }).notNull(),
})


export type Shift = typeof shifts.$inferSelect;
export type ShiftSwapList = typeof shiftSwapLists.$inferSelect;
