import { slackClient } from "@/app/api/slack/route";
import { ModalView } from "@slack/web-api";

export const ErrorModalForAlredy = (): ModalView => {
  return {
    type: "modal",
    title: {
      type: "plain_text",
      text: "申請エラー",
    },
    close: {
      type: "plain_text",
      text: "閉じる",
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `すでに申請されています。`,
        },
      },
    ],
  };
};
