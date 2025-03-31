import { CardHeader, Card, CardContent, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import createNewTeacherAction from "@/actions/teacher/createNewTeacherAction";
import ShiftOption from "../ShiftOption";
import { getShiftOptions } from "@/repositories/shift";
import { getSuubjects } from "@/repositories/subject";
import { getStudents } from "@/repositories/user";
import StudentsSelect from "../StudentsSelect";
import SubjectsSelect from "../SubjectsSelect";
import { DatePickerDemo } from "../DatePicker";
import createNewShiftAction from "@/actions/teacher/createNewShiftAction";

export default async function CreateNewShiftCard({  teacherId} : {teacherId : number}) {
const shiftOptions = await getShiftOptions();
const subjects = await getSuubjects();
const students = await getStudents();



 return (
  <Card>
    <CardHeader>
      <CardTitle>講師の新規作成</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col font-bold gap-1">
        <form action={createNewShiftAction}>
            <div>
            <label>日付選択</label>
            <DatePickerDemo />
            </div>
            <label>時間選択</label>
            <ShiftOption shiftOptions={shiftOptions} />
            <label>生徒選択</label>
            <StudentsSelect students={students} />
            <label>科目選択</label>
            <SubjectsSelect subjects={subjects} />
            <input type="hidden" name="teacherId" value={teacherId} />

            <Button className="mt-3">新規作成する</Button>
        </form>
      </div>
    </CardContent>
  </Card>
 );
}
