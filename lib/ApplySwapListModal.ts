import { ModalView } from "@slack/web-api";
import { ShiftSwapListInfo } from "@/db/schema/shift";
import { ShiftSwapDetail } from "@/db/schema/shift";

export const applySwapListModal = (shift: ShiftSwapDetail): ModalView => {
  return {
    type: "modal",
    callback_id: "apply_swap_shift_list",
    private_metadata: JSON.stringify(shift),
    title: {
      type: "plain_text",
      text: "シフト詳細",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "交換する",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*日付:*\n ${shift.shiftDate}`,
          },
          {
            type: "mrkdwn",
            text: `*コマ:*\n${shift.shiftTime}`,
          },
          {
            type: "mrkdwn",
            text: `*科目:*\n${shift.subjectsName}`,
          },
          {
            type: "mrkdwn",
            text: `*生徒名:*\n ${shift.studentName}`,
          },
          {
            type: "mrkdwn",
            text: `*申請書:*\n ${shift.requesterName}`,
          },
          {
            type: "mrkdwn",
            text: `*申請理由:*\n ${shift.reason}`,
          },
        ],
      },
    ],
  };
};
