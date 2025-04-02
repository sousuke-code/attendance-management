import { incentives } from "@/db/schema/incentive";
import { Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
 } from "@/components/ui/table";
import calcIncentiveOption from "@/domains/teacher/calcIncentiveOption";
import { getTeacherById } from "@/repositories/user";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSubjectsByTeacherId } from "@/repositories/subject";

export async function generateStaticParams() {
   return [];
}

export default async function TeacherPage({params} : {params: Promise<{id : string}>}) {
    const { id } = await params;
    const teacher = await getTeacherById(Number(id));
    const point = teacher[0].point;

    console.log(point);
    if(!point)  throw new Error("Invalid point");
    const availableSubjects = await getSubjectsByTeacherId(Number(id));
    const avaliavleIncentive = await calcIncentiveOption(point);
    console.log(avaliavleIncentive);
    return (
      <>
      <Link href={`/admin/teacher/${teacher[0].id}/create`}>
       <Button>
         シフトの新規作成
       </Button>
      </Link>

       <Table>
         <TableHeader>
            <TableCell>No</TableCell>
            <TableHead className="font-bold">講師名</TableHead>
            <TableHead className="font-bold">メールアドレス</TableHead>
            <TableHead className="font-bold">所有ポイント数</TableHead>
            <TableHead className="font-bold">ID</TableHead>
            <TableHead className="font-bold">選択可能なインセンティブ</TableHead>
            <TableHead className="font-bold">対応可能な教科</TableHead>
         </TableHeader>
         <TableBody>
            <TableRow>
               <TableCell>{teacher[0].id}</TableCell>
               <TableCell>{teacher[0].name}</TableCell>
               <TableCell>{teacher[0].email}</TableCell>
               <TableCell>{teacher[0].point}</TableCell>
               <TableCell>{teacher[0].key}</TableCell>
               <TableCell>
                 <div className="flex flex-wrap gap-1">
                 {avaliavleIncentive.map((incentive) => (
                   <p key={incentive.id} className="bg-blue-500 text-white rounded-xl text-xs px-2 py-1 font-bold">+{incentive.add}円</p>
                 ))}
                 </div>
               </TableCell>
               <TableCell>
                   <div className="flex flex-wrap gap-1">
                   {availableSubjects.map((subject) => (
                      <p key={subject.subjectId} className="bg-blue-500 text-white rounded-xl text-xs px-2 py-1 font-bold">{subject.subjectName}</p>
                   ))}
                   </div>
               </TableCell>
            </TableRow>
         </TableBody>
        
       </Table>
      </>
    )
}
