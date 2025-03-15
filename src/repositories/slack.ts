import { WebClient } from "@slack/web-api";
import { slackClient } from "@/app/api/slack/route";


export async function getUserEmail(userId: string): Promise<string> {
    const response = await slackClient.users.info({ user: userId });
  
    if (!response.ok) {
      throw new Error(`Slack APIエラー: ${response.error}`);
    }
  
    console.log("Emailの取得に成功しました");
  
    const email = response.user?.profile?.email;
    if (!email) {
      throw new Error("Emailが取得できませんでした");
    }
  
    return email;
  }


  export async function getUserByEmail(email: string) {
    const users = await slackClient.users.list({});
    const user = users.members?.find((user) => user.profile?.email === email);
    return user ? user.id : null;
    
  }
