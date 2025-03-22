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


export default async function TeacherPage({params} : {params: Promise<{id : string}>}) {
    const { id } = await params;
    const teacher = await getTeacherById(Number(id));
    const point = teacher[0].point;

    console.log(point);
    if(!point)  throw new Error("Invalid point");
    const avaliavleIncentive = await calcIncentiveOption(point);
    console.log(avaliavleIncentive);
    return (
       <Table>
         <TableHeader>
            <TableHead>講師名</TableHead>
         </TableHeader>
        
       </Table>
    )
}
