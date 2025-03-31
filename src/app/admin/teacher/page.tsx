import { getTeachers } from "@/repositories/user"

import { Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
 } from "@/components/ui/table";
import { Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
 } from "@/components/ui/select";
import Link from "next/link";
import calcIncentiveOption from "@/domains/teacher/calcIncentiveOption";


export default async function TeacherAdminPage() {
    const teachers = await getTeachers();
    console.log(teachers);

    async function incentiveOptions(point: number){
       const incentives = await calcIncentiveOption(point);

       return (
        <div className="flex flex-wrap gap-1">
            {
                incentives.map((incentives) => (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        +{incentives.add}円
                    </span>
                ))
            }
        </div>
       )
    }

    
    return (
        <>
         <Table className="shadow rounded-sm bg-white p10">
            <TableHeader className="font-bold text-lg border-b">
               <TableCell>講師名</TableCell>
               <TableCell>メールアドレス</TableCell>
               <TableCell>所有ポイント数</TableCell>
               <TableCell>利用可能なインセンティブ</TableCell>
               <TableCell></TableCell>
            </TableHeader>
            { teachers.map((teacher) => (
            <TableRow className="border-b px-4 py-2">
            <TableCell>
                <Link href={`/admin/teacher/${teacher.id}`}>
                    {teacher.name}
                </Link>
            </TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.point}</TableCell>
                <TableCell>
                     {teacher.point ? incentiveOptions(teacher?.point) : "ポイントがありません"}
                </TableCell>
                <TableCell>
                    <Link href={`/admin/workRecords/teacher/${teacher.id}`}>
                      <p className="text-blue-600 font-bold">
                      事務記録を見る
                      </p>
                    </Link>
                </TableCell>
            </TableRow>

            ))}
         </Table>
        </>
    )
}
