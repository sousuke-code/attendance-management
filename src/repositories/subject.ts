import { db } from "../../db";
import { subjects,teachersSubjects } from "@/db/schema/subject";
import { eq } from "drizzle-orm";

export async function getSubjectById(id: number){
    return db.select().from(subjects).where(eq(subjects.id, id));
}
