import { pgTable, serial, text, varchar,timestamp, integer} from "drizzle-orm/pg-core";
import { teachers } from "./teacher";
import { students } from "./student";

export const subjects = pgTable('subject', {
    id: serial().primaryKey(),
    name: varchar().notNull(),
})

export const teachersSubjects = pgTable("teachersSubject", {
    id: serial().primaryKey(),
    teacherId: integer().notNull().references(() => teachers.id),
    subjectsId: integer().notNull().references(() => subjects.id),
})

export const studentsSubjects = pgTable("studentsSubject", {
    id: serial().primaryKey(),
    studentId: integer().notNull().references(() => students.id),
    subjectsId: integer().notNull().references(() => subjects.id),
})

export type Subject = typeof subjects.$inferSelect;
export type TeacherSubjects = typeof teachersSubjects.$inferSelect;

