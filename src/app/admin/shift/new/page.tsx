import createNewFixedShiftAction from "@/actions/shift/createNewFixedShiftAction";
import ShiftOption from "@/components/ShiftOption";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WeekdaySelectOption from "@/components/WeedaySelectOption";
import { getShiftOptions } from "@/repositories/shift";
import { getSubjectById } from "@/repositories/subject";
import { getStudentById, getTeacherById } from "@/repositories/user";

type Props = {
  searchParams: Promise<{
    teacherId: string;
    subjectId: string;
    studentId: string;
  }>;
};

export default async function createShiftSwapList({ searchParams }: Props) {
  const { teacherId, subjectId, studentId } = await searchParams;
  if (!teacherId || !subjectId || !studentId) {
    return <div>Invalid parameters</div>;
  }
  const shiftOptions = await getShiftOptions();
  const teacher = await getTeacherById(Number(teacherId));
  const student = await getStudentById(Number(studentId));
  const subject = await getSubjectById(Number(subjectId));

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>シフトの新規作成(固定コマ)</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createNewFixedShiftAction}>
            <div className="grid w-full items-center gap-4 font-bold">
              <div className="flex flex-col">
                <label>教師名</label>
                <input type="hidden" value={teacher[0].id} name="teacherId"/>
                <input type="text" value={teacher[0].name} readOnly />
              </div>

              <div className="flex flex-col">
                <label>生徒名</label>
                <input type="hidden" value={student[0].id} name="studentId"/>
                <input type="text" value={student[0].name} readOnly />
              </div>

              <div className="flex flex-col">
                <label>科目名</label>
                <input type="hidden" value={subject[0].id} name="subjectId"/>
                <input type="text" value={subject[0].name} readOnly />
              </div>

              <div>
                <label>曜日</label>
                <WeekdaySelectOption />
              </div>

              <div>
                <label>シフト時間</label>
                <ShiftOption shiftOptions={shiftOptions} />
              </div>

              <Button>固定コマの作成</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
