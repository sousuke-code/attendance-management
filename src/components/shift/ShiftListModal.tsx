import { 
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { getShiftDetailsById } from "@/repositories/shift";
import type { ShiftSwapDetail } from "@/db/schema/shift";

export default function ShiftListModal({shift}:{shift: ShiftSwapDetail}) {
    console.log(shift)
    return (
        <Dialog>
            <DialogTrigger asChild>
               <Button className="bg-gray-400 text-white font-bold hover:bg-gray-500">詳細を見る</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>シフト詳細</DialogTitle>
                </DialogHeader>
                <div className="font-bold text-lg">
                    <p>シフト日時: {shift.shiftDate}</p>
                    <p>シフト時間: {shift.shiftTime}</p>
                    <p>担当生徒名: {shift.studentName}</p>
                    <p>科目: {shift.subjectsName}</p>
                    <p>申請講師名: {shift.requesterName}</p>
                    <p>交換講師名: {shift.receiverName}</p>
                    <p>交換理由: {shift.reason}</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
