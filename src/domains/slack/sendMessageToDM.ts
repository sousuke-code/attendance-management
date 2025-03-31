import { slackClient } from "@/app/api/slack/route";


export default async function sendMessageToDM(userId: string, status: string){
  if(status === "applied"){
    await slackClient.chat.postMessage({
        channel: userId,
        text: "交換が完了しました\n管理者からの承認をお待ちください"
    })
  }else{
    console.log("すでに他の従業員が交換申請済みです")
    await slackClient.chat.postMessage({
        channel: userId,
        text: "すでに他の従業員が交換申請済みです"
    })
  }

}
