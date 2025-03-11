import { pgTable, serial, uuid,text, varchar, integer, timestamp, check } from "drizzle-orm/pg-core";

export const students = pgTable('student', {
    id: serial().primaryKey(),
    code: uuid().defaultRandom().notNull().unique(),
    password: text(),
    name : varchar().notNull(),
})

export const studentEntries = pgTable('studentEntry', {
    id: serial().primaryKey(),
    studentId: integer().notNull().references(() => students.id),
    checkInTime:  timestamp().defaultNow().notNull(),
    checkOutTime: timestamp(),
})
