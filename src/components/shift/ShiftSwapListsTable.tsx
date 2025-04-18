import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShiftSwapDetail } from "@/db/schema/shift";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import RecruitmentButton from "../RecruitmentButton";
import postShiftRecruitmentAction from "@/actions/shift/postShiftRecruitmentAction";

export default function ShiftSwapListsTable({
  shiftSwapLists,
}: {
  shiftSwapLists: ShiftSwapDetail[];
}) {
  console.log(shiftSwapLists);
  return (
    <form action={postShiftRecruitmentAction}>
      <RecruitmentButton />
      <Table className="shadow rounded-sm bg-white p10 mt-2">
        <TableHeader className="font-bold text-lg border-b">
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="font-bold">日付</TableHead>
            <TableHead className="font-bold">時間</TableHead>
            <TableHead className="font-bold">科目</TableHead>
            <TableHead className="font-bold">生徒名</TableHead>
            <TableHead className="font-bold">申請講師名</TableHead>
            <TableHead className="font-bold">交換理由</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        {shiftSwapLists.map(
          (shift) =>
                      
              <TableBody>
                <TableRow className="border-b px-4 py-2">
                  <TableCell>
                    <Checkbox name="shiftSwapIds" value={shift.id} />
                  </TableCell>
                  <TableCell>{shift.shiftDate}</TableCell>
                  <TableCell>{shift.shiftTime}</TableCell>
                  <TableCell>{shift.subjectName}</TableCell>
                  <TableCell>{shift.studentName}</TableCell>
                  <TableCell>{shift.requesterName}</TableCell>
                  <TableCell>{shift.reason}</TableCell>
                  <TableCell>
                    <Link href={`/admin/shiftTrades/${shift.shiftId}`}>
                      <div className="rounded-l bg-blue-900 text-white font-bold flex items-center justify-center">
                        候補講師を探す
                      </div>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
        )}
      </Table>
    </form>
  );
}
