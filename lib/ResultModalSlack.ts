import { ModalView } from "@slack/web-api";
import type { Shift, ShiftDetail } from "@/db/schema/shift";

export interface ShiftsSlack extends Shift {
    shiftTime: string | null;
    studentName: string | null;
    subjectName: string | null;
}

export const ReasultModal = (shifts: ShiftDetail[]): ModalView => {

    
    const shiftsBlock = shifts.length > 0
        ? shifts.flatMap((shift) => [
            {
                type: "section",
                fields: [
                    { type: "mrkdwn", text: `*生徒名:*\n${shift.studentName}` },
                    { type: "mrkdwn", text: `*日付:*\n${shift.shiftDate}` },
                    { type: "mrkdwn", text: `*コマ時間:*\n${shift.shiftTime}` },
                    { type: "mrkdwn", text: `*科目名:*\n${shift.subjectName}` }
                ]
            },
            {
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: { type: "plain_text", text: "交換申請する", emoji: true},
                        action_id: `apply_shift`,
                        value: JSON.stringify(shift)
                    }
                ]

            },
            {
                type: "divider"
            }
        ])
        : [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "⚠️ 該当するシフトはありません"
                }
            }
        ];

    return {
        type: "modal",
        callback_id: "shift_search_result",
        title: {
            type: "plain_text",
            text: "検索結果",
            emoji: true
        },
        close: {
            type: "plain_text",
            text: "閉じる",
            emoji: true
        },
        blocks: [
            {
                type: "section",
                text: { type: "mrkdwn", text: "🔍 *検索結果*" }
            },
            {
                type: "divider"
            },
            ...shiftsBlock // 修正後の `shiftsBlock` を展開
        ]
    };
};
