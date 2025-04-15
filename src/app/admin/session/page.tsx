
import { client } from "../../../../supabase/supabase"

export default async function SessionPage() {
    const session = await client.auth.getSession();
    console.log("session", session);
    return (
        <div>
         { session.data.session ? (
          <p>
            {session.data.session.user.email}さん、こんにちは
          </p>
         ): (
            <p>
                ログインしていません
            </p>
         )}
        </div>
    )
}