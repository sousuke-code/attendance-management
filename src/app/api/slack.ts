import { App } from "@slack/bolt";
import { Noto_Sans_Tamil_Supplement } from "next/font/google";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const slackApp = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
})

export const config = {
    runtime: 'nodejs',
}


export default async function handler(req: NextRequest) {
    if (req.method === "POST") {
        try {
            const result = await slackApp.client.chat.postMessage({
             channel: "C08EQ5V056W",
             text: "Hello, World!"
            });

            return new NextResponse(JSON.stringify(result), {
                status: 200,
                headers: {
                    'Content-Type' : 'application/json',
                },
            });
        } catch (error) {
            console.error(error);
            return new NextResponse(JSON.stringify({ error : 'メッセージの送信に失敗しました。'}), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } 
    } else {
        return new NextResponse(null, { status: 405});
    }
}
