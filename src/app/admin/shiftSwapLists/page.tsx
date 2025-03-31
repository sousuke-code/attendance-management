import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getSwapListsForWaiting } from "@/repositories/shift";
import approveShiftSwapAction from "@/actions/admin/approveShiftSwapAction";
import RefuseShiftSwapModal from "@/components/RefuseShiftSwapModal";
import ShiftListModal from "@/components/shift/ShiftListModal";


export default async function shiftSwapListsPage() {
     const shiftLists = await getSwapListsForWaiting();

    return (
        <>
        <h1 className="text-2xl font-bold mb-4">シフト交換承認待ち一覧</h1>
        <Table className="rounded-xl shadow-lg border-2 border-solid text-lg bg-white">
            <TableHeader>
                <TableRow>
                    <TableHead className="font-bold">日付</TableHead>
                    <TableHead className="font-bold">コマ</TableHead>
                    <TableHead className="font-bold">科目</TableHead>
                    <TableHead className="font-bold">生徒名</TableHead>
                    <TableHead className="font-bold">申請講師名</TableHead>
                    <TableHead className="font-bold">交換理由</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            { shiftLists.map((shift) => (
                shift.receiverId &&
                <TableBody>
                    <TableRow>
                        <TableCell>{shift.shiftDate}</TableCell>
                        <TableCell>{shift.shiftTime}</TableCell>
                        <TableCell>{shift.subjectName}</TableCell>
                        <TableCell>{shift.studentName}</TableCell>
                        <TableCell>{shift.receiverName}</TableCell>
                        <TableCell>{shift.reason}</TableCell>
                        <TableCell>
                            <ShiftListModal shift={shift} />
                        </TableCell>
                        <TableCell className="flex gap-2">
                      <form action={approveShiftSwapAction} > 
                            <input type="hidden" value={shift.id} name="shiftSwapId"/>
                            <input type="hidden" value={shift.shiftId} name="shiftId" />
                            <input type="hidden" value={shift.receiverId} name="receiverId"/>
                            <Button className="font-bold bg-blue-500 hover:bg-blue-700">承認する</Button>
                      </form>
                     <RefuseShiftSwapModal id={shift.id} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            ))}
        </Table>
         
        </>

    )
}
