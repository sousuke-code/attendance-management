"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup,SelectItem,SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import WorkRecordsTableByTeacher from "./WorkRecordsTableByTeacher";
import { format } from "date-fns";
import { workRecords, type WorkRecords } from "@/db/schema/work";


export default function WorkRecordFilterClient({ workRecords} : {workRecords : WorkRecords[]}) {
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [ totalWorkTime, setToatalWorkTime ] = useState<number>(0);

    const filtered = selectedMonth
     ? workRecords.filter((record) => 
        format(record.start, "M") === selectedMonth
    )
    : workRecords;

    useEffect(() => {
        const minutes = filtered.reduce((acc, record) => {
            const diffMs = new Date(record.end).getTime() - new Date(record.start).getTime();
            const diffMin = Math.floor(diffMs / 1000 / 60);
            return acc + diffMin;
        }, 0);

        setToatalWorkTime(minutes);
    },[selectedMonth]);

    const hours = Math.floor(totalWorkTime / 60);
    const minutes = totalWorkTime % 60;


    return (
        <>
        <div className="mb-3">
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
        
        <WorkRecordsTableByTeacher workRecords={filtered} />

        <div className="mt-2 text-lg font-bold">
             <p>合計勤務時間: {hours}時間{minutes}分</p>
        </div>
        </>
    )

    
}
