import { eq, and, inArray, desc } from "drizzle-orm";
import { DB, db } from "../../db";
import { attendaces } from "@/db/schema/attendance";
import { checkIn } from "@/domains/teacher/workRecord/checkIn";

export async function createAttendance(teacherId: number, checkIn: Date){
    return db.insert(attendaces).values({
        teacherId: teacherId,
        checkIn: checkIn,
    })

}

export async function findAttendanceByTeacherId(teacherId: number){
    return await db.select().from(attendaces).where(eq(attendaces.teacherId, teacherId)).orderBy(desc(attendaces.checkIn)).limit(1);
}

export async function updateAttendance(attendanceId: number, checkOut: Date){
    return db.update(attendaces).set({ checkOut: checkOut }).where(eq(attendaces.id, attendanceId));
}
