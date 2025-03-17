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


export default async function shiftSwapListsPage() {
     const shiftLists = await getSwapListsForWaiting();

    return (
        <>
        <h1 className="text-2xl font-bold mb-4">シフト交換承認待ち一覧</h1>
        <Table className="rounded-xl shadow-lg border-2 border-solid text-lg">
            <TableHeader className="bg-gray-200">
                <TableRow>
                    <TableHead>日付</TableHead>
                    <TableHead>コマ</TableHead>
                    <TableHead>科目</TableHead>
                    <TableHead>生徒名</TableHead>
                    <TableHead>申請講師名</TableHead>
                    <TableHead>交換理由</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            { shiftLists.map((shift) => (
                shift.receiverId &&
                <TableBody>
                    <TableRow>
                        <TableCell>{shift.shiftDate}</TableCell>
                        <TableCell>{shift.shiftTime}</TableCell>
                        <TableCell>{shift.subjectsName}</TableCell>
                        <TableCell>{shift.studentName}</TableCell>
                        <TableCell>{shift.receiverName}</TableCell>
                        <TableCell>{shift.reason}</TableCell>
                        <TableCell>
                      <form action={approveShiftSwapAction} > 
                            <input type="hidden" value={shift.id} name="shiftSwapId"/>
                            <input type="hidden" value={shift.shiftId} name="shiftId" />
                            <input type="hidden" value={shift.receiverId} name="receiverId"/>
                            <Button className="font-bold bg-blue-500 hover:bg-blue-700 mr-10">承認する</Button>
                            <Button className="font-bold bg-red-500 hover:bg-red-700">拒否する</Button>
                      </form>
                        </TableCell>
                    </TableRow>
                </TableBody>
            ))}
        </Table>
         
        </>

    )
}
