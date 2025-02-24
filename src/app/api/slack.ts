import { App } from "@slack/bolt";
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
    return new NextResponse(null, { status: 405});
   }

   const body = await req.json();

   if(body.challenge){
    return new NextResponse(JSON.stringify({ challenge: body.challenge }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
   }

   if (body.event?.type === "app_mention") {
    try{
        await slackApp.client.chat,postMessage({
            channel: body.event.channel,
            text: `こんにちは、<@${body.event.user}>さん！`
        });

        return new NextResponse(JSON.stringify({ message: "OK" }), {status: 200})
   } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Error" }), {status: 500})
   }
}
    return new NextResponse(null, { status: 200 });
}
