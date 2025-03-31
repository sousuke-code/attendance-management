"use server";

import { checkOut } from "@/domains/teacher/workRecord/checkOut";
import { findTeacherByKey } from "@/repositories/user";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
    teacherId: z.string().uuid("講師IDの形式が正しくありません"),
})

type FormState = {
    message: string | null;
    success?: boolean;
    officeTime?: {
        start: string;
        end: string;
        minutes: number;
    }[];
    teacherId?:number;
    attendanceId?:number;
}

export async function checkOutAction(previousState: FormState,formData: FormData) : Promise<FormState> {
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
    if(!teacher) return {message: "講師が見つかりません"};
    const result = await checkOut(teacher[0].id);

    if(result?.needsInput){
        return {
            message: null,
            success: true,
            officeTime: result.officeTime.map(time => ({
                start: String(time.start),
                end: String(time.end),
                minutes: time.minutes,
            })),
            teacherId: teacher[0].id,
            attendanceId: result.attendanceId,
        }
    }
}
