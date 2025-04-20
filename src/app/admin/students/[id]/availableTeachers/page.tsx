import { getTeacherSubjects } from "@/repositories/teacherSubject";
import { getTeacherById } from "@/repositories/user";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// export async function generateStaticParams() {
//     return [];
// }

export default  async function availableTeachersPage(props : {
    params: Promise<{id : string}>,
    searchParams: Promise<{ subjectId: string}>
}) {
    const { id } = await props.params;
    const { subjectId } = await props.searchParams;
    if(!id || !subjectId){
        return <div>Invalid parameters</div>;
    }

    const studentId = Number(id);
    const teacherSubjects = await getTeacherSubjects(Number(subjectId));
    const teachers = await Promise.all(teacherSubjects.map((teacher)=> getTeacherById(teacher.teacherId)));
    
    return (
        <>
        <h1>対応可能な講師一覧</h1>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>講師名</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { teachers.map((teacher)=> (
                    <TableRow>
                        <TableCell>{teacher[0].name}</TableCell>
                        <TableCell>
                            <Link href={`/admin/shift/new?teacherId=${teacher[0].id}&subjectId=${subjectId}&studentId=${studentId}`}>
                             <Button className="bg-blue-600 font-bold">
                                シフトを組む
                             </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
        </>
    )
    

}
