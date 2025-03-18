
import { Button } from "./ui/button";
import { 
Dialog,
DialogContent,
DialogDescription,
DialogHeader,
DialogTitle,
DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { refuseShiftSwapAction } from "@/actions/admin/refuseShiftSwapAction";
export default function RefuseShiftSwapModal({ id } : { id: number }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-red-500 hover:bg-red-600 font-bold">拒否する</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>シフト交換希望を拒否</DialogTitle>
                </DialogHeader>
                <form action={refuseShiftSwapAction}>
                    <h1>拒否理由</h1>
                    <input type="hidden" name="shiftId" value={id}/>
                    <Textarea name="reason"/>
                    <Button className="">送信する</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
} 
