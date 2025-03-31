"use server";
import { getShiftDetailsById, getShiftSwapListsById, getShistSwapListsDetatlsById } from "@/repositories/shift";
import { getUserByEmail } from "@/repositories/slack";
import sendRequestMessageToTeachers from "@/domains/slack/sendRequestMessageToTeachers";
import sendRejectedMessage from "@/domains/slack/sendRejectedMessage";
import { findTeacherEmailById, getTeacherById } from "@/repositories/user";
import { AwardIcon } from "lucide-react";


export default async function  sendMessageToTeachersAction(formData: FormData){
    const teacherIds = (formData.getAll("teacherIds"));
    const shiftId= Number(formData.get("shiftId"));
    console.log(teacherIds);
    console.log(shiftId);

    
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
            if(!userId) throw new Error(" users not have")

            await sendRequestMessageToTeachers(userId,[
               {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `オーナーからのシフト交換依頼が届いています\n📅 *日付:* ${shift[0].shiftDate}\n🕒 *時間:* ${shift[0].shiftTime}\n👤 *生徒:* ${shift[0].studentName}\n📔 *科目:* ${shift[0].subjectName}\n`,
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
