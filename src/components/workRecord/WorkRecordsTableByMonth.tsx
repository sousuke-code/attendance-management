import { Table, TableCell, TableHeader, TableRow } from "../ui/table";
import { format } from "date-fns";
import type { WorkRecords } from "@/db/schema/work";
import type { WorkRecordDetail } from "@/db/schema/work";
import { Button } from "../ui/button";

export default function WorkRecordsTableByMonth({ workRecords } : { workRecords: WorkRecordDetail[]}) {



    return (
        <>
        <div>

        </div>
        <Table className="shadow rounded-sm bg-white p-10">
            <TableHeader className="font-bold text-lg border-b">
                <TableCell>日付</TableCell>
                <TableCell>講師名</TableCell>
                <TableCell>時間</TableCell>
                <TableCell>内容</TableCell>
            </TableHeader>
            { workRecords.map((workRecord) => (
            <TableRow className="border-b px-4 py-2" key={workRecord.id}>
                <TableCell>{workRecord.start.toLocaleDateString()}</TableCell>
                <TableCell>{workRecord.teacherName}</TableCell>
                <TableCell>{format(workRecord.start,"HH:mm")} ~ {format(workRecord.end, "HH:mm")}</TableCell>
                <TableCell>{workRecord.content}</TableCell>
            </TableRow>
            ))}

        </Table>
        </>
    )
}