"use client";

import type { WorkRecords } from "@/db/schema/work";
import { format } from "date-fns";
import { Button } from "./ui/button";
import type { WorkRecordDetail } from "@/db/schema/work";

export default function ExportCSVButton({ workRecords } : { workRecords: WorkRecordDetail[] }) {
    const downLoadCsv = () => {
        const header = ["日付","講師名","時間", "内容"];
        const rows = workRecords.map((workRecord) => {
            const date = workRecord.start.toLocaleDateString();
            const name= workRecord.teacherName;
                        const time = `${format(workRecord.start, "HH:mm")} ~ ${format(workRecord.end, "HH:mm")}`;
                        const content = workRecord.content;
                        return [date, name,time, content];
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
        <Button onClick={downLoadCsv} className="bg-blue-500 font-bold ">
            CSVダウンロード
        </Button>
    )
}