import { NextRequest, NextResponse } from "next/server";
import { WebClient } from "@slack/web-api";
import { shiftModal } from "../../../../lib/ModalSlack";
import { ReasultModal } from "../../../../lib/ResultModalSlack";
import { findShifts, findShiftSwapListByShiftId } from "@/repositories/shift";
import { confirmationModal } from "../../../../lib/ConfirmationModal";
import { createShiftSwapList } from "@/repositories/shift";
import { getRecurutingShiftSwapList } from "@/repositories/shift";
import { applySwapListModal } from "../../../../lib/ApplySwapListModal";
import { updateSwapListsStatus } from "@/repositories/shift";
import { getUser, getUserByEmail, getUserEmail } from "@/repositories/slack";
import { findShiftsByUser } from "@/repositories/shift";
import { findTeacherByEmail, getTeacherBySubject } from "@/repositories/user";
import { parseISO, isAfter, isBefore, addDays, startOfDay } from "date-fns";
import { parse } from "path";
import sendShiftRecruitment from "@/domains/slack/sendShiftRecruitment";
import sendShiftRecruitmentByUser from "@/domains/slack/sendShiftRecruitmentByUser";
import { th } from "@faker-js/faker";
import { ErrorModalForAlredy } from "../../../../lib/ErrorModalForAlready";
import sendMessageToDM from "@/domains/slack/sendMessageToDM";

export const slackClient = new WebClient(process.env.SLACK_TOKEN);

export async function POST(req: NextRequest) {
  try {
    let body: any;

    let email: string | null = null;
    if (req.headers.get("content-type") === "application/json") {
      body = await req.json();
    } else {
      const bodyText = await req.text();
      const params = new URLSearchParams(bodyText);
      body = Object.fromEntries(params.entries());
    }

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

      if (payload.user.id) {
        email = await getUserEmail(payload.user.id);
      }

      console.log("email:", email);

      if (
        payload.type === "view_submission" &&
        payload.view.callback_id === "shift_search"
      ) {
        const values = payload.view.state.values;
        console.log("values:", values);

        const selectedSlots =
          values["shift_date_block"]?.["datepicker-action"]?.selected_date;
        console.log("選択日時:", selectedSlots);

        const selectedTimeSlots = values["shift_time_block"]?.[
          "multi_static_select-action"
        ].selected_options.map((slot: { value: string }) => Number(slot.value));
        console.log("選択コマ時間:", selectedTimeSlots);

        // 検索されたシフトを表示
        if (!email) {
          return NextResponse.json({ message: "Error: Email not found" });
        }
        const shifts = await findShiftsByUser(
          email,
          selectedTimeSlots,
          selectedSlots
        );

        // 検索結果をモーダル表示
        const resultModal = ReasultModal(shifts);
        console.log(resultModal);

        await slackClient.views.update({
          view_id: payload.view.id,
          view: resultModal,
        });

        return NextResponse.json({ message: "processing..." });
      }

      // 交換理由の入力モーダル表示
      if (payload.type === "block_actions") {
        const action = payload.actions[0];
        console.log("確認モーダル表示中1...");

        if (action.action_id.startsWith("apply_shift")) {
          const shiftData = JSON.parse(action.value);

          const hasShiftSwapList = await findShiftSwapListByShiftId(shiftData.id);
          console.log("hasShiftSwapList:", hasShiftSwapList);
          if(hasShiftSwapList.length > 0){
            await slackClient.views.update({
              view_id: payload.view.id,
              view: ErrorModalForAlredy(),
            })

            return NextResponse.json({ message: "alredy applied" });
          }

          console.log("確認モーダル表示中...");
          await slackClient.views.update({
            view_id: payload.view.id,
            view: confirmationModal(shiftData),
          });

          return NextResponse.json({ message: "processing..." });
        }

        if (action.action_id.startsWith("swap_shift")) {
          const swapShiftData = JSON.parse(action.value);
          console.log("swapShiftData:", swapShiftData);
          console.log(payload);

          await slackClient.views.open({
            trigger_id: payload.trigger_id,
            view: applySwapListModal(swapShiftData),
          });

          return NextResponse.json({ message: "processing..." });
        }
      }

      // シフト交換申請の処理（送信後のイベント）
      if (
        payload.type === "view_submission" &&
        payload.view.callback_id === "confirmation"
      ) {
        const data = JSON.parse(payload.view.private_metadata);
        const shiftId = data.id;
        const studentId = data.studentId;
        const date = parseISO(data.shiftDate);
        const values = payload.view.state.values;
        const reason = values["reason_block"]["reason_input"].value;
        const nowDate = new Date();
        const oneWeekAfter = addDays(nowDate, 7);
      
        if(!email) throw new Error("Email not found");
        const teacher = await findTeacherByEmail(email);
        const teacherId = teacher[0]?.id;
      
        
        const response = NextResponse.json({ response_action: "clear" });
      
        
        (async () => {
          try {
            console.log(studentId);
            await createShiftSwapList(shiftId, studentId, reason, teacherId);
      
            if (isAfter(date, nowDate) && isBefore(date, oneWeekAfter)) {
              const teachers = await getTeacherBySubject(data.subjectId);
      
              for (const teacher of teachers) {
                const teacherEmail = teacher.teacherEmail;
                if (!teacherEmail) continue;
      
                const id = await getUserByEmail(teacherEmail);
                if (!id) continue;
      
                await sendShiftRecruitmentByUser(id, [
                  {
                    type: "section",
                    text: {
                      type: "mrkdwn",
                      text: `${data.teacherName}さんからのシフト交換依頼が届いています`,
                    },
                  },
                  {
                    type: "section",
                    fields: [
                      { type: "mrkdwn", text: `*日程:*\n${data.shiftDate}` },
                      { type: "mrkdwn", text: `*時間:*\n${data.shiftTime}` },
                      { type: "mrkdwn", text: `*生徒名:*\n${data.studentName}` },
                      { type: "mrkdwn", text: `*科目:*\n${data.subjectName}` },
                    ],
                  },
                  {
                    type: "actions",
                    elements: [
                      {
                        type: "button",
                        text: { type: "plain_text", emoji: true, text: "交換する" },
                        style: "primary",
                        value: JSON.stringify(data),
                        action_id: "via_dm",
                      },
                    ],
                  },
                ]);
              }
            }
          } catch (err) {
            console.error("シフト交換の非同期処理でエラー:", err);
          }
        })();
      
        return response;
      }

      //　DMでの交換申請
      if (
       payload.type ===  "block_actions"
      ) {
        const action = payload.actions[0];
        if(action.action_id === "via_dm"){
          const raw = action.value;
          const data = JSON.parse(raw);
          if (!email)
            return NextResponse.json({ message: "Error: Email not found" });
          const teacherId = await getUserByEmail(email);
          if(!teacherId) throw new Error("Teacher not found");
          const hasShiftSwapList = await findShiftSwapListByShiftId(data.id);
          if(hasShiftSwapList){
            const receiver = await findTeacherByEmail(email);
            const receiverId = receiver[0]?.id;
            console.log("receiverId:", receiverId);
            await updateSwapListsStatus(data.id, receiverId);
            await sendMessageToDM(teacherId, "appied");
            return NextResponse.json({
              response_action: "clear",
            });
          } else {
            await sendMessageToDM(teacherId, "rejected");
            return NextResponse.json({
              response_action: "clear",
            })
          }
        }
      }

      //チャンネル上での交換申請
      if(
        payload.type === "view_submission" &&
        payload.view.callback_id === "apply_shift_via_dm"
      ){
        const data = JSON.parse(payload.view.private_metadata);
        if(!email) throw new Error("Email not ");
        const receiver= await findTeacherByEmail(email);
        const receiverId = receiver[0]?.id;
        await updateSwapListsStatus(data.id, receiverId);

        return NextResponse.json({
          response_action: "clear",
        });
      }
    }


    // シフト募集一覧表示
    if (body.action === "send_shift_notifications") {
      console.log("シフト募集一覧を送信中...");
      const swapShiftLists = await getRecurutingShiftSwapList();

      const blocks = swapShiftLists.map((shift) => ({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `📅 *日付:* ${shift.shiftDate}\n🕒 *時間:* ${shift.shiftTime}\n👤 *スタッフ:* ${shift.requesterName}`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "詳細を見る",
          },
          action_id: `swap_shift_${shift.id}`,
          value: JSON.stringify(shift), // モーダルで使用するデータをボタンに埋め込む
        },
      }));

      await slackClient.chat.postMessage({
        channel: "C08EQ5V056W",
        text: "シフト募集一覧",
        blocks: blocks,
      });

      return NextResponse.json({ message: "シフト募集一覧を送信しました" });
    }

    return NextResponse.json({ message: "No command found" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error processing request" });
  }
}
