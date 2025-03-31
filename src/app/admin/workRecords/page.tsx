
import { Table, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { getWorkRecords } from "@/repositories/workRecord";
import { format } from "date-fns";
import Link from "next/link";


export default async function workRecordsPage() {
    const workRecords = await getWorkRecords();
    console.log(workRecords);
    return (
        <>
        <h1 className="font-bold mb-4 text-xl">事務時間一覧</h1>
         <Table className="shadow rounded-sm bg-white p-10">
            <TableHeader className="font-bold text-lg border-b">
                <TableCell>日付</TableCell>
                <TableCell>時間</TableCell>
                <TableCell>講師名</TableCell>
                <TableCell>内容</TableCell>
            </TableHeader>
            { workRecords.map((workRecord) => (
            <TableRow className="border-b px-4 py-2">
                <TableCell>{workRecord.start.toLocaleDateString()}</TableCell>
                <TableCell>{format(workRecord.start,"HH:mm")} ~ {format(workRecord.end, "HH:mm")}</TableCell>
                <TableCell>
                    <Link href={`/admin/workRecords/teacher/${workRecord.teacherId}`}>
                    {workRecord.teacherName}
                    </Link>
                </TableCell>
                <TableCell>{workRecord.content}</TableCell>
            </TableRow>
            ))}

         </Table>
        </>
    )
}
