import { db } from "../../db";
import { students } from "@/db/schema/student";
import { eq } from "drizzle-orm";

export async function getStudens() {
    return db.select().from(students);
}

export async function getStudentById(id:number) {
    return db.select().from(students).where(eq(students.id, id));
}
