import { students } from "@/db/schema/student";
import { db } from "../../db";
import { studentsSubjects, subjects,teachersSubjects } from "@/db/schema/subject";
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


export async function getSuubjects() {
    return db.select().from(subjects);
}

export default function getAvailableSubjectsByStudent(id: number){
    return db.select({
        subjectId: subjects.id,
        subjectName: subjects.name,
    })
    .from(studentsSubjects)
    .innerJoin(subjects, eq(studentsSubjects.subjectsId, subjects.id))
    .where(eq(studentsSubjects.studentId, id));
}

