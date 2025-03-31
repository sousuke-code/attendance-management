import { db } from "../../db";
import { teachersSubjects } from "@/db/schema/subject";
import { eq } from "drizzle-orm";
import { getSuubjects } from "./subject";

export async function getTeacherSubjects(id: number){
    return db.select().from(teachersSubjects).where(eq(teachersSubjects.subjectsId, id));
}

export async function createTeacherSubject(teacherId: number){
    const subjects = await getSuubjects();
    subjects.forEach(async (subject) => {
        return db.insert(teachersSubjects).values({
            teacherId: teacherId,
            subjectsId: subject.id,
        })
    })
    
}
