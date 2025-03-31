import { slackClient } from "@/app/api/slack/route";

export default async function sendRequestMessageToTeachers(userId: string, block: any) {
    await slackClient.chat.postMessage({
        channel: userId,
        text: "オーナーからのシフト交換依頼が届いています",
        blocks: block,
    })
}

