"use server";
import { redirect } from "next/navigation";
import { db } from "../../../db";
import { fixedShifts } from "@/db/schema/shift";
export default async function createNewFixedShiftAction(formData: FormData) {
    const teacherId = formData.get("teacherId");
    const studentId = formData.get("studentId");
    const subjectId = formData.get("subjectId");
    const weekday = formData.get("weekday");
    const shiftTimeId = formData.get("shiftTimeId");

    console.log(teacherId, studentId, subjectId,weekday);

    await db.insert(fixedShifts).values({
        teacherId: Number(teacherId),
        studentId: Number(studentId),
        weekday: Number(weekday),
        subject: Number(subjectId),
        shiftId: Number(shiftTimeId)
    })
    redirect(`/admin/students/${studentId}`);



    
}
