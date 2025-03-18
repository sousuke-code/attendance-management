"use server";

import { getShiftSwapListsByIds } from "@/repositories/shift";
import sendShiftRecruitment from "@/domains/slack/sendShiftRecruitment";
import { z } from "zod";


const shiftSwapIdsSchema = z
.array(z.string())
.transform((ids) => ids.map((id) => Number(id)));

export default async function postShiftRecruitmentAction(formData: FormData){
    const data = formData.getAll("shiftSwapIds");
    const shiftSwapIds = shiftSwapIdsSchema.parse(data);
    // if(!shiftSwapIds) throw new Error("シフトIdが見つかりません")
    const shiftSwapLists = await getShiftSwapListsByIds(shiftSwapIds);

    const blocks = shiftSwapLists.map((shift) => ({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `📅 *日付:* ${shift.shiftDate}\n🕒 *時間:* ${shift.shiftTime}\n👤 *生徒:* ${shift.studentName}\n📔 *科目:* ${shift.subjectsName}\n👨‍🏫 *申請講師名:* ${shift.requesterName}\n*交換理由:* ${shift.reason}`,
      },
      accessory: {
        type: "button",
        text: {
            type: "plain_text",
            text: "詳細を見る",
        },
        action_id: `swap_shift_${shift.id}`,
        value: JSON.stringify(shift),
      },
    }));

    await sendShiftRecruitment(blocks);

}
