"use server";

import { redirect } from "next/navigation";
import { findShift } from "@/repositories/shift";
import { Shift } from "@/db/schema/shift";

export default async function findShiftAction(formData: FormData) {
    console.log(formData);

    if(formData){
        const date = formData.get("date");
        if(!date) throw new Error("日付が入力されていません");
        const shiftOptionId = formData.get("shiftOptionId") as string;
        const studentId = formData.get("studentId") as string;
        const result =  await findShift(Number(studentId),new Date(date.toString()),Number(shiftOptionId));
        if(!result[0]) return redirect("/admin/shift/new");
        const id = result[0].id;
        redirect(`/admin/shift/new?id=${id}`);
    }
    redirect("/admin/shift/new");

}
