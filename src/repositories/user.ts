import { db } from "../../db";
import { students } from "@/db/schema/student";
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
