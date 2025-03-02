import { ModalView } from "@slack/web-api"
import { getShiftOptions } from "@/repositories/shift"
import { getStudens } from "@/repositories/user";


const shiftOptions = await getShiftOptions();
const students = await getStudens();

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
				"text": "下記から選択肢て交換したいシフトを探してください"
			}
		},
		{
			"type": "section",
            "block_id": "shift_date_block",
			"text": {
				"type": "mrkdwn",
				"text": "Pick a date for the deadline."
			},
			"accessory": {
				"type": "datepicker",
				"initial_date": "1990-04-28",
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
		{
			"type": "input",
            "block_id": "student_name_block",
			"element": {
				"type": "multi_static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select options",
					"emoji": true
				},
				"options": studentsOptionsForModal,
				"action_id": "multi_static_select-action"
			},
			"label": {
				"type": "plain_text",
				"text": "生徒名",
				"emoji": true
			}
		}
	]
}
