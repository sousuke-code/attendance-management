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
                <div className="grid grid-cols-2 gap-4 text-lg font-medium">
                    <p className="text-gray-500">シフト日時:</p>
                    <p>{shift.shiftDate}</p>
                    <p className="text-gray-500">シフト時間:</p>
                    <p>{shift.shiftTime}</p>
                    <p className="text-gray-500">担当生徒名:</p>
                    <p>{shift.studentName}</p>
                    <p className="text-gray-500">科目:</p>
                    <p>{shift.subjectName}</p>
                    <p className="text-gray-500">申請講師名:</p>
                    <p>{shift.requesterName}</p>
                    <p className="text-gray-500">交換講師名:</p>
                    <p>{shift.receiverName}</p>
                    <p className="text-gray-500">交換理由:</p>
                    <p >{shift.reason}</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
