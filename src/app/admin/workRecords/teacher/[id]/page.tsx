import { getWorkRecordsByTeacher } from "@/repositories/workRecord";
import { getWaitUntilPromiseFromEvent } from "next/dist/server/web/spec-extension/fetch-event";
import { Select, SelectContent, SelectGroup,SelectItem,SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import WorkRecordFilterClient from "@/components/workRecord/WorkRecordFilterClient";
import { getTeacherById } from "@/repositories/user";

// export async function generateStaticParams() {
//     return [];
// }

type Props = {
    params: Promise<{
      id: string;
    }>;
};

export default async function WorkRecordsByTeacherPage({ params } : Props) {
    const { id } = await params;
    const teacher = await getTeacherById(Number(id));
    const workRecords = await getWorkRecordsByTeacher(Number(id));
    
    return (
        <>
        <h1 className="text-l font-bold mb-5">{teacher[0].name}さんの事務時間記録</h1>
        <WorkRecordFilterClient workRecords={workRecords} />
        </>
    )
}
