import { db } from "../../db";
import { students } from "@/db/schema/student";
import { teachersSubjects } from "@/db/schema/subject";
import { teachers } from "@/db/schema/teacher";
import { eq } from "drizzle-orm";

export async function getStudens() {
    return db.select().from(students);
}

export async function getStudentById(id:number) {
    return db.select().from(students).where(eq(students.id, id));
}

export async function findTeacherByEmail(email: string){
    return db.select().from(teachers).where(eq(teachers.email, email));
}


export async function findTeacherEmailById(id: number){
    return db.select().from(teachers).where(eq(teachers.id, id)).limit(1);
}

export async function getTeacherById(id: number){
    return db.select().from(teachers).where(eq(teachers.id, id));
}

export async function getTeachers(){
    return db.select().from(teachers);
}

export async function getStudents(){
    return db.select().from(students);
}

export async function getPoint(id: number){
    return db.select().from(teachers)
}

export async function getTeacherBySubject(subjectId: number){
    return db.select({
        teacherId: teachers.id,
        teacherName: teachers.name,
        teacherEmail: teachers.email,
    })
    .from(teachers)
    .innerJoin(teachersSubjects, eq(teachers.id, teachersSubjects.teacherId))
    .where(eq(teachersSubjects.subjectsId, subjectId));
}  


export async function findTeacherByKey(key:string){
    return db.select().from(teachers).where(eq(teachers.key, key));

}

export async function findTeacherById(id: number){
    return db.select().from(teachers).where(eq(teachers.id, id));
}
