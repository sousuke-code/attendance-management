"use server";
import { redirect } from "next/navigation";
import { db } from "../../../db";
import { fixedShifts, shifts } from "@/db/schema/shift";
import { nextDay,isSameDay , addDays } from "date-fns";
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

    const today = new Date();
    const daysToGenerate = 360;


    for(let i = 0; i < daysToGenerate; i++){
        const date = addDays(today, i);
        if(date.getDay() === Number(weekday)){
            await db.insert(shifts).values({
                studentId: Number(studentId),
                date: date.toLocaleString(),
                subjectId: Number(subjectId),
                shiftId: Number(shiftTimeId),
                teacherId: Number(teacherId),
            })
        }
    }

    redirect(`/admin/students/${studentId}`);

}
