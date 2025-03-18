import { db } from "../../db";
import { subjects,teachersSubjects } from "@/db/schema/subject";
import { eq } from "drizzle-orm";

export async function getSubjectById(id: number){
    return db.select().from(subjects).where(eq(subjects.id, id));
}

export async function getSubjectsByTeacherId(id: number){
    return db.select({
        subjectId: subjects.id,
        subjectName: subjects.name,
    })
    .from(teachersSubjects)
    .innerJoin(subjects, eq(teachersSubjects.subjectsId, subjects.id))
    .where(eq(teachersSubjects.teacherId, id));
}
