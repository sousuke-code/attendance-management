import { CardHeader, Card, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import createNewTeacherAction from "@/actions/teacher/createNewTeacherAction";

export default async function CreateNewTeacherCard() {

 return (
  <Card>
    <CardHeader>
      <CardTitle>講師の新規作成</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col">
        <form action={createNewTeacherAction}>
            <label>講師名</label>
            <Input
            name="teacherName"
            id="teacherName"
            placeholder="講師名を入力してください"
            className="w-full"
            required
            />

            <label>メールアドレス</label>
            <Input
            name="teacherEmail"
            id="teacherEmail"
            placeholder="メールアドレスを入力してください"
            required
            />

            <Button className="mt-3">新規作成する</Button>
        </form>
      </div>
    </CardContent>
  </Card>
 );
}
