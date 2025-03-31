import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { toast } from "sonner";
  
  import { Button } from "@/components/ui/button";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Toaster } from "sonner";
  import { differenceInCalendarDays, differenceInDays } from "date-fns";
  
  import { getShiftSwapLists } from "@/repositories/shift";
  import postShiftRecruitmentAction from "@/actions/shift/postShiftRecruitmentAction";
  import RecruitmentButton from "@/components/RecruitmentButton";
  import avilaibleTeachersAction from "@/actions/teacher/availableTeachersAction";
  import Link from "next/link";
  
  export default async function AdminPage() {
    const shiftSwapLists = await getShiftSwapLists();
    console.log(shiftSwapLists);
    return (
      <>
        <h1 className="text-2xl font-bold mb-4">シフト交換申請一覧</h1>
        <Toaster 
          position="top-right"
          theme="light"
        />
        <form action={postShiftRecruitmentAction}>
        <RecruitmentButton />
        <Table className="rounded-xl shadow-lg border-2 border-solid text-lg bg-white">
          <TableHeader >
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
                <TableCell>{shiftSwap.shiftTime} </TableCell>
                <TableCell>{shiftSwap.subjectName}</TableCell>
                <TableCell>{shiftSwap.studentName}</TableCell>
                <TableCell>{shiftSwap.requesterName}</TableCell>
                <TableCell>{shiftSwap.reason}</TableCell>
                <TableCell>                    
                    <Link href={`/admin/shiftTrades/${shiftSwap.shiftId}`}>
                    <div className="rounded-l bg-blue-900 text-white font-bold flex items-center justify-center">
                    候補講師を探す
                    </div>
                    </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
        </form>
      </>
    );
  }
