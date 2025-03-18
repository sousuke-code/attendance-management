
import { slackClient } from "@/app/api/slack/route";
import { getShiftDetailsById } from "@/repositories/shift";
import { getUserByEmail } from "@/repositories/slack";
import { findTeacherEmailById } from "@/repositories/user";

export default async function sendRejectedMessage(id:number){
  console.log(id);
  const shiftDetails = await getShiftDetailsById(id);
  console.log(shiftDetails);
  const receiver = await findTeacherEmailById(shiftDetails[0].teacherId);
    if(!receiver[0].email){
        throw new Error("Teacher not found");
    }
  const userId = await getUserByEmail(receiver[0].email);
  if  (!userId) {
    throw new Error("User");
   }
  await slackClient.chat.postMessage({
    channel: userId,
    text: `❌ シフト交換が拒否されました！\n
    - シフト日時: ${shiftDetails[0].shiftDate} \n
    - シフト時間: ${shiftDetails[0].shiftTime} \n
    - 生徒: ${shiftDetails[0].studentName} \n
    - 科目: ${shiftDetails[0].subjectName} \n`,
  })
}
