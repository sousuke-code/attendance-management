import { getWorkRecordsByTeacher } from "@/repositories/workRecord";
import { getWaitUntilPromiseFromEvent } from "next/dist/server/web/spec-extension/fetch-event";
import { Select, SelectContent, SelectGroup,SelectItem,SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import WorkRecordFilterClient from "@/components/workRecord/WorkRecordFilterClient";

export async function generateStaticParams() {
    return [];
}

type Props = {
    params: Promise<{
      id: string;
    }>;
};

export default async function WorkRecordsByTeacherPage({ params } : Props) {
    const { id } = await params;
    const workRecords = await getWorkRecordsByTeacher(Number(id));
    
    return (
        <>
        <WorkRecordFilterClient workRecords={workRecords} />
        </>
    )
}
