import { pgTable, serial, integer, boolean, timestamp,time } from "drizzle-orm/pg-core";
import { classRooms } from "./classroom";
import { students } from "./student";
import { release } from "os";


export const seats = pgTable('seat', {
    id: serial().primaryKey(),
    classroomId: integer().notNull().references(() => classRooms.id),
    seatNumber: integer().notNull(),
    isAvailable: boolean().default(false).notNull(),
    createdAt: timestamp().defaultNow(),
})


export type Seat = typeof seats.$inferSelect;

export const seatAssignments = pgTable('seatAssignment', {
    id: serial().primaryKey(),
    studentId: integer().notNull().references(() => students.id),
    seatId: integer().notNull().references(() => seats.id),
    assignedAt: time().defaultNow().notNull(),
    releasedAt: time(),
})
