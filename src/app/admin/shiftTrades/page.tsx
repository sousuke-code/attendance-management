import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  import { getShiftSwapLists } from "@/repositories/shift";
  
  export default async function AdminPage() {
    const shiftSwapLists = await getShiftSwapLists();
    console.log(shiftSwapLists);
    return (
      <>
        <Table>

          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">日時</TableHead>
              <TableHead className="font-bold">時間</TableHead>
              <TableHead className="font-bold">科目</TableHead>
              <TableHead className="font-bold">生徒名</TableHead>
              <TableHead className="font-bold">申請講師名</TableHead>
              <TableHead className="font-bold">申請理由</TableHead>
            </TableRow>
          </TableHeader>
          { shiftSwapLists.map((shiftSwap) => (
            <TableBody>
              <TableRow>
                <TableCell>{shiftSwap.shiftDate}</TableCell>
                <TableCell>{shiftSwap.shiftTime} ( {shiftSwap.shiftId}コマ目 )</TableCell>
                <TableCell>{shiftSwap.subjectsName}</TableCell>
                <TableCell>{shiftSwap.studentName}</TableCell>
                <TableCell>{shiftSwap.receiverName}</TableCell>
                <TableCell>{shiftSwap.reason}</TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </>
    );
  }
