"use server";
import { slackClient } from "@/app/api/slack/route";
import { getTeacherBySubject } from "@/repositories/user";

export default async function sendShiftRecruitmentByUser(userId: string,block: any){
    await slackClient.chat.postMessage({
        channel: userId,
        text: "シフト交換依頼",
        blocks: block,
    })
    
}
