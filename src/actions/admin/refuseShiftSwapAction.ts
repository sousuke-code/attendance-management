"use server";

import { updateSwapListsStatusToRejected } from "@/repositories/shift";
import { db } from "../../../db";
import type { DB } from "../../../db";
import sendRejectedMessage from "@/domains/slack/sendRejectedMessage";
import { redirect } from "next/navigation";

export async function refuseShiftSwapAction(formData: FormData){
    const id = Number(formData.get("shiftId"))
    const reason = formData.get("reason")
    if(!id) throw new Error("シフトIdが見つかりません")
    await db.transaction(async (tx: DB) => {
      await updateSwapListsStatusToRejected(tx,id);
      await sendRejectedMessage(id);
    })
    redirect("/admin/shiftSwapLists");
}
