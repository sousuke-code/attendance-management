import { db } from "../../../db";
import type { DB } from "../../../db";
import { teachers } from "@/db/schema/teacher";
import { eq } from "drizzle-orm";


const POINTS = 100;


export default async function addPoint(tx: DB,id: number){
    if (!id) throw new Error("Invalid id");
    const teacher = await tx.select().from(teachers).where(eq(teachers.id, id));
    if (!teacher) throw new Error("Teacher not found");
    if (!teacher[0].point && teacher[0].point != 0) throw new Error("Teacher has null ");
    const prevPoint = teacher[0].point;
    
    await tx.update(teachers).set({ point: prevPoint + POINTS}).where(eq(teachers.id, id));
}
