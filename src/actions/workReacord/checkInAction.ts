"use server";

import { checkIn } from "@/domains/teacher/workRecord/checkIn";
import { findTeacherByKey } from "@/repositories/user";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    teacherId: z.string().uuid("講師IDの形式が正しくありません"),
})

type FormState = {
    message: string | null;
    success?: boolean;
}

export async function checkInAction( previousState: FormState,formData: FormData) : Promise<FormState> {
    const raw = {
        teacherId: formData.get("teacherId"),
    }

    const parsed = schema.safeParse(raw);
    if(!parsed.success){
        return { message: parsed.error.errors[0].message };
    }
   const { teacherId } = parsed.data;
   
   if(!teacherId){ return { message: "講師IDが入力されていません"}; };
   const teacher = await findTeacherByKey(String(teacherId));
   if(!teacher){
       return { message : "講師が見つかりません"};
    }
    await checkIn(teacher[0].id);
    return redirect("/teacher/attendance");
}
