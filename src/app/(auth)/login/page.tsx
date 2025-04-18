import signInAction from "@/actions/auth/signInAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default async function LoginForAdminPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
            <Card>
                <CardHeader>
                    <CardTitle>管理者ログイン</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
            </Card>
          </div>
        </div>
    )
}