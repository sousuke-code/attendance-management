"use server";

import { eq } from "drizzle-orm";
import { db } from "../../../db";
import { shifts, shiftSwapLists } from "@/db/schema/shift";
import addPoint from "@/domains/point/addPonint";
import { redirect } from "next/navigation";
import { findTeacherEmailById } from "@/repositories/user";
import { getUserByEmail } from "@/repositories/slack";
import sendApproveMessage from "@/domains/slack/sendApproveMessage";
import { getShiftById, getShiftDetailsById, getShiftOptionById } from "@/repositories/shift";



export default async function approveShiftSwapAction(formData: FormData) {
   const shiftSwapId = Number(formData.get("shiftSwapId"));
   const shiftId = Number(formData.get("shiftId"));

   const receiverId = Number(formData.get("receiverId"));
   if(!shiftId){
       throw new Error("Invalid shiftId");
   };
    if(!receiverId){
         throw new Error("Invalid receiverId");
    };
   //update\\\
   await db.transaction(async (tx) => {
       await tx.update(shiftSwapLists).set({status: "approved"}).where(eq(shiftSwapLists.id, shiftSwapId));
       await addPoint(tx,receiverId);  // ポイントの追加
       await tx.update(shifts).set({ teacherId: receiverId}).where(eq(shifts.id, shiftId));
   })

   const reciver= await findTeacherEmailById(receiverId);
    if(!reciver[0].email){
         throw new Error("Teacher not found");
    }

   const shiftDetails = await getShiftDetailsById(shiftId);
   const requesterId = shiftDetails[0].teacherId;
   const requester = await findTeacherEmailById(requesterId);
    if(!requester[0].email){
         throw new Error("Requester not found");
    }
   
   const userId = await getUserByEmail(reciver[0].email);
   const requesterUserId = await getUserByEmail(requester[0].email);
   const userPoints = reciver[0].point;

   if(userId){
    await sendApproveMessage(userId, `✅ シフト交換が承認されました！\n
        - シフト日時: ${shiftDetails[0].shiftDate} \n
        - シフト時間: ${shiftDetails[0].shiftTime} \n
        - 生徒: ${shiftDetails[0].studentName} \n
        - 科目: ${shiftDetails[0].subjectName} \n
        あなたのポイントは現在${userPoints}です！`);
   }

   if(requesterUserId){
    await sendApproveMessage(requesterUserId, `シフトが交換が承認されました!\n
        `)
   }

   //slack通知
   return redirect("/admin/shiftSwapLists");
}

