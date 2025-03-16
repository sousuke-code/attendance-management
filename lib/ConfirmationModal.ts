import { ModalView } from "@slack/web-api";
import { ShiftDetail } from "@/db/schema/shift";

export const confirmationModal = (shift: ShiftDetail) : ModalView => {
    console.log(shift);
    return {
    type: "modal",
    callback_id: "confirmation",
    private_metadata: JSON.stringify(shift),
    title: {
        type: "plain_text",
        text: "確認",
        emoji: true
    },
    close: {
        type: "plain_text",
        text: "キャンセル",
        emoji: true
    },
    submit: {
        type: "plain_text",
        text: "送信",
        emoji: true
    },
    blocks: [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `申請の内容の確認\n
                *生徒名:* ${shift.studentName}\n
                *日付:* ${shift.shiftDate}\n
                *コマ時間:* ${shift.shiftTime} (${shift.shiftTime}コマ目)\n
                *科目名:* ${shift.subjectName}\n
                `
            }
        },
        {
            type: "input",
            block_id: "reason_block",
            element: {
                type: "plain_text_input",
                action_id: "reason_input",
                multiline: true,
                placeholder: {
                    type: "plain_text",
                    text: "申請理由を入力してください"
                }
            },
            label: {
                type: "plain_text",
                text: "申請理由",
                emoji: true
            }
        }
    ]
 }
}
