import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import signInByStudentAction from "@/actions/auth/signInByStudentAction";

export default async function StudentPage() {
    return (
        <Card className="w-4/5 mx-auto p-6 mt-10">
            <CardHeader>
                <CardTitle>生徒ページ</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={signInByStudentAction}>
                <div className="mb-10">

                <div>
                    <Label htmlFor="">ID</Label>
                    <Input type="text" name="id" required className="w-full rounded-md border border-gray-300"/>
                </div>

                <div>
                    <Label htmlFor="">パスワード</Label>
                    <Input type="password" name="password" required className="w-full rounded-md border border-gray-300"/>
                </div>
                </div>
                <div className="flex gap-4 items-center justify-center">
                    <Button className="rounded-md bg-sky-200 text-black ">入室する</Button>
                    <Button className="rounded-md bg-red-200 text-black ">退室する</Button>
                </div>

                </form>
            </CardContent>
        </Card>
    )
}
