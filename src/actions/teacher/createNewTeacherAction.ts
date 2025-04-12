"use server";

import { createTeacherSubject } from "@/repositories/teacherSubject";
import { createTeacher, findTeacherByEmail } from "@/repositories/user";
import { redirect } from "next/navigation";
export default async function createNewTeacherAction(formData: FormData){
    const teacherName = formData.get("teacherName") as string;
    const teacherEmail = formData.get("teacherEmail") as string;
    const teacher = await findTeacherByEmail(teacherEmail);
    if(teacher) throw new Error("このメールアドレスは既に登録されています");

    const result = await createTeacher(teacherName, teacherEmail);
    console.log(result);
    await createTeacherSubject(Number(result.id));

    redirect("/admin/teacher");
}
