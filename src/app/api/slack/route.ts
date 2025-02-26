import { NextRequest, NextResponse } from "next/server";
import { WebClient } from "@slack/web-api";

const slackClient = new WebClient(process.env.SLACK_TOKEN);

import { ModalView } from "@slack/web-api";

const shiftModal: ModalView = {
	"type": "modal",
	"title": {
		"type": "plain_text",
		"text": "シフト交換申請",
		"emoji": true
	},
	"submit": {
		"type": "plain_text",
		"text": "Submit",
		"emoji": true
	},
	"close": {
		"type": "plain_text",
		"text": "Cancel",
		"emoji": true
	},
	"blocks": [
		{
			"type": "section",
            "block_id" : "date_selection_block",
			"text": {
				"type": "plain_text",
				"text": "下記から日時を選択してください",
				"emoji": true
			}
		},
		{
			"type": "actions",
            "block_id": "date_picker_block",
			"elements": [
				{
					"type": "datepicker",
					"initial_date": "1990-04-28",
					"placeholder": {
						"type": "plain_text",
						"text": "Select a date",
						"emoji": true
					},
					"action_id": "actionId-0"
				}
			]
		},
		{
			"type": "section",
            "block_id":"shift_selection_block",
			"text": {
				"type": "mrkdwn",
				"text": "シフト交換希望のコマを選択してください"
			},
			"accessory": {
				"type": "multi_static_select",
				"placeholder": {
					"type": "plain_text",
					"text": "Select options",
					"emoji": true
				},
				"options": [
					{
						"text": {
							"type": "plain_text",
							"text": "1コマ目",
							"emoji": true
						},
						"value": "value-0"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "2コマ目",
							"emoji": true
						},
						"value": "value-1"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "3コマ目",
							"emoji": true
						},
						"value": "value-2"
					},
					{
						"text": {
							"type": "plain_text",
							"text": "4コマ目",
							"emoji": true
						},
						"value": "value-3"
					}
				],
				"action_id": "multi_static_select-action"
			}
		}
	]
}

export async function POST(req: NextRequest) {
    try {
        const bodyText = await req.text();
        const params = new URLSearchParams(bodyText);

        const body = Object.fromEntries(params.entries());
        console.log("body:", body);

        if (body.type === "url_verification") {
            return NextResponse.json({ challenge: body.challenge });
        }

        if (body.command === "/シフト交換"){
            await slackClient.views.open({
              trigger_id: body.trigger_id,
              view: shiftModal
            });
            return NextResponse.json({ text: "Modal opened" });
        }

        if(body.payload){
            const payload = JSON.parse(body.payload);
            console.log("payload:", payload);

            console.log("payload:", payload);
            if (payload.type === "view_submission") {
              const values = payload.view.state.values;
              console.log("values:", values);
              const selectedDate = values["date_picker_block"]?.["actionId-0"]?.selected_date;
              const selectedSlots = values["shift_selection_block"]?.["multi_static_select-action"]?.selected_options?.map((option: any) => option.text.text);

              return NextResponse.json({ message: "Submitted" });
            }
        }

        return NextResponse.json({ message : "No command founf"});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}
