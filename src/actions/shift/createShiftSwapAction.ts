"use server";
import { createShiftSwapList } from "@/repositories/shift";
import { redirect } from "next/navigation";

export default async function createShiftSwapAction(formDate: FormData){
    if (!formDate) throw new Error("フォームデータが入力されていません");
    const shiftId = Number(formDate.get("shiftId"));
    const studentId = Number(formDate.get("studentId"));
    const reason = "管理者";
    await createShiftSwapList(shiftId, studentId, reason);
    redirect("/admin");
}
