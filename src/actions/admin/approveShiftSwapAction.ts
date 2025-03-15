"use server";

import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { shiftSwapLists } from "@/db/schema/shift";
import addPoint from "@/domains/point/addPonint";
import { redirect } from "next/navigation";
import { findTeacherEmailById } from "@/repositories/user";
import { getUserByEmail } from "@/repositories/slack";
import sendApproveMessage from "@/domains/slack/sendApproveMessage";



export default async function approveShiftSwapAction(formData: FormData) {
   const shiftId = Number(formData.get("shiftId"));
   const receiverId = Number(formData.get("receiverId"));
   if(!shiftId){
       throw new Error("Invalid shiftId");
   };
    if(!receiverId){
         throw new Error("Invalid receiverId");
    };
   //update
   await db.update(shiftSwapLists).set({status: "approved"}).where(eq(shiftSwapLists.id, shiftId));
   await addPoint(receiverId);  // ポイントの追加

   const reciver= await findTeacherEmailById(receiverId);
    if(!reciver[0].email){
         throw new Error("Teacher not found");
    }
   const userId = await getUserByEmail(reciver[0].email);

   if(userId){
    await sendApproveMessage(userId, `✅ シフト交換が承認されました！`);
   }

   //slack通知
   return redirect("/admin/shiftSwapLists");

   //承認メッセージを遅らせる
}

