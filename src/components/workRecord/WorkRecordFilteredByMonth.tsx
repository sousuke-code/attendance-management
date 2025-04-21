"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup,SelectItem,SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import type { WorkRecordDetail } from "@/db/schema/work";
import WorkRecordsTableByMonth from "./WorkRecordsTableByMonth";
import ExportCSVButton from "../ExportSVButton";

export default function WorkRecordFilteredByMonth({ workRecords} : { workRecords : WorkRecordDetail[]}) {
    const [ selectedMonth, setSelectedMonth] = useState<string>("");

    const filtered = selectedMonth
        ? workRecords.filter((record) => 
            format(record.start, "M") === selectedMonth
        )
        : workRecords;


    return (
        <>
        <ExportCSVButton workRecords={filtered} />
        <div className="mb-3 w-1/4 bg-white mt-2">
        <Select onValueChange={setSelectedMonth}>
            <SelectTrigger>
                <SelectValue placeholder="月を選択" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>月</SelectLabel>
                    {Array.from({ length: 12}, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}月
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
        </div>

        <WorkRecordsTableByMonth workRecords={filtered} />

        </>
    )

}