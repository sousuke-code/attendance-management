import { ModalView } from "@slack/web-api"
import { getShiftOptions } from "@/repositories/shift"
import { getStudens } from "@/repositories/user";


const shiftOptions = await getShiftOptions();
const students = await getStudens();
const today = new Date();	

const shiftOptionsForModal = shiftOptions.map((option: any) => ({
  text: {
	type: "plain_text" as const,
	text: option.shiftTime,
	emoji: true,
  },
  value: `${option.id}`,
}))

const studentsOptionsForModal = students.map((student) => ({
    text: {
        type: "plain_text" as const,
        text: student.name,
        emoji: true,
    },
    value: `${student.id}`,
}))

export const shiftModal: ModalView = {
	"type": "modal",
    "callback_id": "shift_search",
	"submit": {
		"type": "plain_text",
		"text": "検索する",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "閉じる",
		"emoji": true
	},
	"title": {
		"type": "plain_text",
		"text": "シフト交換申請",
		"emoji": true
	},
	"blocks": [
		{
			"type": "section",
            "block_id": "shift_selection_block",
			"text": {
				"type": "mrkdwn",
				"text": "下記の入力項目を記入して交換したいシフトを探してください"
			}
		},
		{
			"type": "section",
            "block_id": "shift_date_block",
			"text": {
				"type": "mrkdwn",
				"text": "日時を選択してください"
			},
			"accessory": {
				"type": "datepicker",
				"initial_date": `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
				"placeholder": {
					"type": "plain_text",
					"text": "Select a date",
					"emoji": true
				},
				"action_id": "datepicker-action"
			}
		},
		{
			"type": "input",
            "block_id": "shift_time_block",
			"element": {
				"type": "multi_static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "コマ時間を選択",
					"emoji": true
				},
				"options": shiftOptionsForModal,
				"action_id": "multi_static_select-action"
			},
			"label": {
				"type": "plain_text",
				"text": "コマ時間",
				"emoji": true
			}
		},
	]
}
