import { Table, TableCell, TableHeader, TableRow} from "../ui/table";
import { format } from "date-fns";
import Link from "next/link";
import type { WorkRecords } from "@/db/schema/work";
import { Button } from "../ui/button";




export default function WorkRecordsTableByTeacher({ workRecords } : { workRecords: WorkRecords[]}) {
    const downLoadCsv = () => {
        const header = ["日付", "時間", "内容"];
        const rows = workRecords.map((workRecord) => {
            const date = workRecord.start.toLocaleDateString();
            const time = `${format(workRecord.start, "HH:mm")} ~ ${format(workRecord.end, "HH:mm")}`;
            const content = workRecord.content;
            return [date, time, content];
        });
        const csvContent = [header, ...rows]
            .map(e => e.map(field => `"${(field ?? "").replace(/"/g, '""')}"`).join(","))
            .join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <>
         <div className="mb-5">
            <Button onClick={downLoadCsv} className="bg-blue-500 font-bold ">
                CSVダウンロード
            </Button>
         </div>
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
