import signInAction from "@/actions/auth/signInAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function LoginForAdminPage() {
    return (
        <div>
            <h1>管理者ログイン</h1>
            <form action={signInAction}>
                <div>
                    <label htmlFor="email">メールアドレス</label>
                    <Input type="email" name="email" id="email" required />
                </div>
                <div>
                    <label htmlFor="password">パスワード</label>
                    <Input type="password" name="password" id="password" required />
                </div>
                <Button>ログイン</Button>
            </form>
        </div>
    )
}