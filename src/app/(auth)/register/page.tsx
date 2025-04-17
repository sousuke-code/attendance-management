import signUpAction from "@/actions/auth/signUpAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function RegisterForAdminPage() {
    return (
        <div>
            <h1>管理者登録画面</h1>
            <form action={signUpAction}>
                <div>
                    <label htmlFor="email">メールアドレス</label>
                    <Input type="email" name="email" id="email" required />
                </div>
                <div>
                    <label htmlFor="password">パスワード</label>
                    <Input type="password" name="password" id="password" required />
                </div>
                <Button>登録</Button>
            </form>
        </div>
    )
}