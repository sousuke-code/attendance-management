import { getStudents } from "@/repositories/user"
import { Table, TableHeader, TableRow, TableCell } from "@/components/ui/table";


export default async function StudentsForAdminPage(){
    const students = await getStudents();
    console.log(students);
    return (
        <>
         <Table>
            <TableHeader>
                <TableCell>生徒名</TableCell>
                <TableCell>無題</TableCell>
            </TableHeader>
            { students.map((student) => (
                <TableRow>
                    <TableCell>{student.name}</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            ))}
         </Table>
        </>
    )
}
