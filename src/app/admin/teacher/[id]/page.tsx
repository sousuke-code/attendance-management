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

export async function generateStaticParams() {
   return [];
}

export default async function TeacherPage({params} : {params: Promise<{id : string}>}) {
    const { id } = await params;
    const teacher = await getTeacherById(Number(id));
    const point = teacher[0].point;

    console.log(point);
    if(!point)  throw new Error("Invalid point");
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
            <TableHead>講師名</TableHead>
            <TableHead>メールアドレス</TableHead>
            <TableHead>所有ポイント数</TableHead>
            <TableHead>ID</TableHead>
         </TableHeader>
         <TableBody>
            <TableRow>
               <TableCell>{teacher[0].id}</TableCell>
               <TableCell>{teacher[0].name}</TableCell>
               <TableCell>{teacher[0].email}</TableCell>
               <TableCell>{teacher[0].point}</TableCell>
               <TableCell>{teacher[0].key}</TableCell>
            </TableRow>
         </TableBody>
        
       </Table>
      </>
    )
}
