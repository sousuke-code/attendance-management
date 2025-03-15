import { db } from "../../../db";
import { teachers } from "@/db/schema/teacher";
import { eq } from "drizzle-orm";


const POINTS = 100;


export default async function addPoint(id: number){
    if (!id) throw new Error("Invalid id");
    const teacher = await db.select().from(teachers).where(eq(teachers.id, id));
    if (!teacher) throw new Error("Teacher not found");
    if (!teacher[0].point) throw new Error("Teacher has null ");
    const prevPoint = teacher[0].point;
    
    await db.update(teachers).set({ point: prevPoint + POINTS}).where(eq(teachers.id, id));
}
