"use server";
import { db } from "../../../db";
import { shifts } from "@/db/schema/shift";
import { redirect } from "next/navigation";
export default async function createNewShiftAction(formData: FormData){
    const teacherId= Number(formData.get("teacherId"));
    const shiftDate= formData.get("date") as string;
    const shiftId = Number(formData.get("shiftTimeId")) ;
    const studentId = Number(formData.get("studentId"));
    const subjectId = Number(formData.get("subjectId"));

    console.log(teacherId);
    console.log(shiftDate);
    console.log(shiftId);
    console.log(studentId);
    console.log(subjectId);

    await db.insert(shifts).values({
        teacherId: teacherId,
        date: new Date(shiftDate).toDateString(),
        studentId: studentId,
        shiftId: shiftId,
        subjectId: subjectId,
    })

    console.log("新規シフトを作成しました");

    redirect(`/admin/teacher/${teacherId}`);


}
