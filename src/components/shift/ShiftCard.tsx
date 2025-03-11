import { getShift } from "@/repositories/shift";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import createShiftSwapAction from "@/actions/shift/createShiftSwapAction";
import { Button } from "../ui/button";

export default async function ShiftCard({ id }: { id: string }) {
  const shift = await getShift(Number(id));
  return (
    <Card>
      <CardHeader>
        <CardTitle>シフト詳細</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createShiftSwapAction}>
          <input type="hidden" name="shiftId" value={shift[0].id} />
          <input type="hidden" name="studentId" value={shift[0].studentId} />
        
          <div>
            <label className="text-lg">日付</label>
            <p className="text-md">{shift[0].date}</p>
          </div>
          <div>
            <label className="text-lg">コマ</label>
            <p className="text-md">{shift[0].shiftTime}</p>
          </div>
          <div>
            <label className="text-lg">生徒</label>
            <p className="text-md">{shift[0].studentName}</p>
          </div>
          <div>
            <label className="text-lg">教科</label>
            <p className="text-md">{shift[0].subjectName}</p>
          </div>
          <Button type="submit">交換申請する</Button>
        </form>
      </CardContent>
    </Card>
  );
}
