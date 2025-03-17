import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  import { Checkbox } from "@/components/ui/checkbox";
  import { differenceInCalendarDays, differenceInDays } from "date-fns";
  
  import { getShiftSwapLists } from "@/repositories/shift";
  import postShiftRecruitmentAction from "@/actions/shift/postShiftRecruitmentAction";
  
  export default async function AdminPage() {
    const shiftSwapLists = await getShiftSwapLists();
    console.log(shiftSwapLists);
    return (
      <>
        <h1 className="text-2xl font-bold mb-4">シフト交換申請一覧</h1>
        <form action={postShiftRecruitmentAction}>
        <Button className="mt-r bg-blue-500">シフト募集を呼びかける</Button>
        <Table className="rounded-xl shadow-lg border-2 border-solid text-lg">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="font-bold">日時</TableHead>
              <TableHead className="font-bold">時間</TableHead>
              <TableHead className="font-bold">科目</TableHead>
              <TableHead className="font-bold">生徒名</TableHead>
              <TableHead className="font-bold">申請講師名</TableHead>
              <TableHead className="font-bold">申請理由</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          { shiftSwapLists.map((shiftSwap) => (
            <TableBody className={
              differenceInCalendarDays(new Date(), shiftSwap.createdAt) <= 7
               ? ""
                : ""
            }>
              <TableRow className="">
                <TableCell>
                  <Checkbox name="shiftSwapIds" value={shiftSwap.id}/>
                </TableCell>
                <TableCell>{shiftSwap.shiftDate}</TableCell>
                <TableCell>{shiftSwap.shiftTime} ( {shiftSwap.shiftId}コマ目 )</TableCell>
                <TableCell>{shiftSwap.subjectsName}</TableCell>
                <TableCell>{shiftSwap.studentName}</TableCell>
                <TableCell>{shiftSwap.requesterName}</TableCell>
                <TableCell>{shiftSwap.reason}</TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
        </form>
      </>
    );
  }
