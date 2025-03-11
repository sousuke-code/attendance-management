import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "../ui/select";
import findShiftAction from "@/actions/shift/findShiftsAction";
import { getStudens } from "@/repositories/user";
import { getShiftOptions } from "@/repositories/shift";

export default async function CreateNewShiftForm() {
  const students = await getStudens();
  const shiftOptions =await getShiftOptions();


  return (
    <Card className="">
      <CardHeader>
        <CardTitle>シフト検索</CardTitle>
        <CardDescription>検索条件を入力してください</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={findShiftAction}>
            <div>
                <label>日付</label>
                <Input type="date" name="date" required />
            </div>

            <div>
                <label>コマ</label>
                <Select name="shiftOptionId">
                    <SelectTrigger>
                        <SelectValue placeholder="コマ時間を選択"/>
                    </SelectTrigger>
                    <SelectContent>
                        {shiftOptions.map((shiftOption) => (
                            <SelectItem key={shiftOption.id} value={shiftOption.id.toString()} >
                                {shiftOption.shiftTime}
                            </SelectItem> 
                        ))}
                    </SelectContent>

                </Select>
            </div>

            <div>
                <label>生徒</label>
                <Select name="studentId">
                    <SelectTrigger>
                        <SelectValue placeholder="生徒を選択"/>
                    </SelectTrigger>
                    <SelectContent>
                        {students.map((student) => (
                            <SelectItem key={student.id} value={student.id.toString()}>
                                {student.name}
                            </SelectItem>
                        ))}
                    </SelectContent>

                </Select>
            </div>

            <Button>検索する</Button>
        </form>
      </CardContent>

      <CardFooter>
      </CardFooter>
    </Card>
  );
}
