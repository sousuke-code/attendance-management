import { workRecords } from "@/db/schema/work";
import { db } from "../../db";
import { teachers } from "@/db/schema/teacher";
import { desc, eq } from "drizzle-orm";

export async function getWorkRecords(){
    return db.select({
        id: workRecords.id,
        teacherId: workRecords.teacherId,
        teacherName: teachers.name,
        content: workRecords.content,
        start: workRecords.start,
        end: workRecords.end,
    })
    .from(workRecords)
    .innerJoin(teachers, eq(workRecords.teacherId, teachers.id))
    .orderBy(desc(workRecords.createdAt));
}


export async function getWorkRecordsByTeacher(teacherId: number){
    return db.select().from(workRecords).where(eq(workRecords.teacherId, teacherId));
}
