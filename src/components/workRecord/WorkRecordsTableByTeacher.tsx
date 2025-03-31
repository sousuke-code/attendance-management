import { Table, TableCell, TableHeader, TableRow} from "../ui/table";
import { format } from "date-fns";
import Link from "next/link";
import type { WorkRecords } from "@/db/schema/work";




export default function WorkRecordsTableByTeacher({ workRecords } : { workRecords: WorkRecords[]}) {
    return (
        <>
         <Table className="shadow rounded-sm bg-white p-10">
            <TableHeader className="font-bold text-lg border-b">
                <TableCell>日付</TableCell>
                <TableCell>時間</TableCell>
                <TableCell>内容</TableCell>
            </TableHeader>
            { workRecords.map((workRecord) => (
            <TableRow className="border-b px-4 py-2">
                <TableCell>{workRecord.start.toLocaleDateString()}</TableCell>
                <TableCell>{format(workRecord.start,"HH:mm")} ~ {format(workRecord.end, "HH:mm")}</TableCell>
                <TableCell>{workRecord.content}</TableCell>
            </TableRow>
            ))

            }
         </Table>
        </>
    ) 
}
