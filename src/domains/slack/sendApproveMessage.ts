import { slackClient } from "@/app/api/slack/route"
export default async function sendApproveMessage(userId: string, message: string) {
  await slackClient.chat.postMessage({
    channel: userId,
    text: message,
  })    
}
