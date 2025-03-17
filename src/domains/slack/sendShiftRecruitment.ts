import { slackClient } from "@/app/api/slack/route";

export default async function sendShiftRecruitment(blocks: any) {
    await slackClient.chat.postMessage({
        channel: "C08EQ5V056W",
        text: "シフト募集一覧",
        blocks: blocks,
    })
}
