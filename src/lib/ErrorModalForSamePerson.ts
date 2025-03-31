import { ModalView } from "@slack/web-api";


export const ErrorModalForSamePerson = (): ModalView => {
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
              text: `自分のシフトを交換することはできません。`,
            },
          },
        ],
      };
}



