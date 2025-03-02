import { NextRequest, NextResponse } from "next/server";
import { WebClient } from "@slack/web-api";
import { shiftModal } from "../../../../lib/ModalSlack";
import { ReasultModal } from "../../../../lib/ResultModalSlack";
import { findShifts } from "@/repositories/shift";
import { confirmationModal } from "../../../../lib/ConfirmationModal";
import { createShiftSwapList } from "@/repositories/shift";

const slackClient = new WebClient(process.env.SLACK_TOKEN);

import { ModalView } from "@slack/web-api";

export async function POST(req: NextRequest) {
  try {
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);

    const body = Object.fromEntries(params.entries());
    console.log("body:", body);

    if (body.type === "url_verification") {
      return NextResponse.json({ challenge: body.challenge });
    }

    if (body.command === "/シフト交換") {
      await slackClient.views.open({
        trigger_id: body.trigger_id,
        view: shiftModal,
      });
      return NextResponse.json({ text: "Modal opened" });
    }

    if (body.payload) {
      const payload = JSON.parse(body.payload);
      console.log("payload:", payload);

      console.log("payload:", payload);
      if (payload.type === "view_submission" && payload.view.callback_id === "shift_search") {
        const values = payload.view.state.values;
        console.log("values:", values);

        const selectedSlots =
          values["shift_date_block"]?.["datepicker-action"]?.selected_date;
        console.log("選択日時:", selectedSlots);
        const selectedTimeSlots = values["shift_time_block"]?.[
          "multi_static_select-action"
        ].selected_options.map((slot: { value: string }) => Number(slot.value));
        console.log("選択コマ時間:", selectedTimeSlots);
        const selectedStudens = values["student_name_block"]?.[
          "multi_static_select-action"
        ].selected_options.map((slot: { value: string }) => Number(slot.value));
        console.log("選択生徒:", selectedStudens);

        NextResponse.json({ message: "processing..." });

        //検索されたシフトを表示
        const shifts = await findShifts(
          selectedStudens,
          selectedSlots,
          selectedTimeSlots
        );
        console.log(shifts);

        //検索結果をモーダル表示に
        const resultModal = ReasultModal(shifts);
        console.log(resultModal);
        await slackClient.views.update({
          view_id: payload.view.id,
          view: resultModal,
        });

        return NextResponse.json({ message: "processing..." });
      }

      //交換内容の確認
      if (payload.type === "block_actions") {
        const action = payload.actions[0];
        console.log("確認モーダル表示中1...");
        console.log(action);
        console.log(action.action_id);

        if (action.action_id.startsWith("apply_shift")) {
          const shiftData = JSON.parse(action.value);

          console.log("確認モーダル表示中...");
          await slackClient.views.update({
            view_id: payload.view.id,
            view: confirmationModal(shiftData),
          });

          return NextResponse.json({ message: "processing..." });
        }
      }

      if (
        payload.type === "view_submission" &&
        payload.view.callback_id === "confirmation"
      ) {
		console.log("申請理由を取得中...");
        const data = JSON.parse(payload.view.private_metadata);
        const shiftId = data.id;

        const values = payload.view.state.values;
        const reason = values["reason_block"]["reason_input"].value;

        console.log("シフトID:", shiftId);
        console.log("申請理由:", reason);
		await createShiftSwapList(shiftId, reason);

		return NextResponse.json({
			response_action: "clear"
		})
      }
    }

    return NextResponse.json({ message: "No command founf" });
  } catch (error) {
    return NextResponse.json({ message: "No command founf" });
  }
}
