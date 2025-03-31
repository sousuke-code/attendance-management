"use server";
import { getShiftDetailsById, getShiftSwapListsById, getShistSwapListsDetatlsById } from "@/repositories/shift";
import { getUserByEmail } from "@/repositories/slack";
import sendRequestMessageToTeachers from "@/domains/slack/sendRequestMessageToTeachers";
import sendRejectedMessage from "@/domains/slack/sendRejectedMessage";
import { findTeacherEmailById, getTeacherById } from "@/repositories/user";
import { AwardIcon } from "lucide-react";
import { getIncentives } from "@/repositories/incentive";
import calcIncentiveOption from "@/domains/teacher/calcIncentiveOption";


export default async function  sendMessageToTeachersAction(formData: FormData){
    const teacherIds = (formData.getAll("teacherIds"));
    const shiftId= Number(formData.get("shiftId"));

    
    const shift = await getShistSwapListsDetatlsById(shiftId);
    
    

    const teachers = await Promise.all(
        teacherIds.map(async (teacherId) => {
            return await getTeacherById(Number(teacherId));
        })
    );

    await Promise.all(
        teachers.map(async (teacher) => {
            const receiver = await findTeacherEmailById(teacher[0].id);
            if(!receiver[0].email) throw new Error("Teacher not have email");
            const userId =await getUserByEmail(receiver[0].email);
            const points = teacher[0].point;
            if(!points) throw new Error(" points not have");
            const incentives = await calcIncentiveOption(points);
            const maxIncentive = incentives.reduce((prev,current) => 
                current.add > prev.add ? current : prev
            );

            if(!userId) throw new Error(" users not have")

            await sendRequestMessageToTeachers(userId,[
               {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `オーナーからのシフト交換依頼が届いています\n📅 *日付:* ${shift[0].shiftDate}\n🕒 *時間:* ${shift[0].shiftTime}\n👤 *生徒:* ${shift[0].studentName}\n📔 *科目:* ${shift[0].subjectName}\nあなたのポイントは現在${points}です！\nあなたのポイントでは時給+${maxIncentive.add}円の報酬を受け取ることができます！🎉\n
                    `,
                },
                accessory: {
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "詳細を見る",
                    },
                    action_id: `send_recruitment_via_web${shift[0].id}`,
                    value: JSON.stringify(shift[0]),
               },
            }]
             )
        })
    )



}
