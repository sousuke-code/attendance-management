import { db } from "../../db";
import { teachersSubjects } from "@/db/schema/subject";
import { eq } from "drizzle-orm";

export async function getTeacherSubjects(id: number){
    return db.select().from(teachersSubjects).where(eq(teachersSubjects.subjectsId, id));
    
}
