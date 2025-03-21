import { getTeachers } from "@/repositories/user"

import { Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
 } from "@/components/ui/table";


export default async function TeacherAdminPage() {
    const teachers = await getTeachers();
    console.log(teachers);
    return (
        <>
         <Table>
            <TableHeader>
               <TableCell>講師名</TableCell>
               <TableCell>メールアドレス</TableCell>
               <TableCell>所有ポイント数</TableCell>
            </TableHeader>
            { teachers.map((teacher) => (
            <TableRow>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.point}</TableCell>
            </TableRow>

            ))}
         </Table>
        </>
    )
}
