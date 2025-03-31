import { getStudents } from "@/repositories/user";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/components/ui/table";
import Link from "next/link";
import getAvailableSubjectsByStudent from "@/repositories/subject";
import { getFixedShiftByStudent } from "@/repositories/shift";

export default async function StudentsForAdminPage() {
  const students = await getStudents();

  const studentsWithUnregisteredLessons = await Promise.all(
    students.map(async (student) => {
      const subjects = await getAvailableSubjectsByStudent(student.id);
      const fixedShifts = await getFixedShiftByStudent(student.id);
      const fixedSubjectIds = fixedShifts.map((shift) => shift.subject);

      const unregisteredCount = subjects.filter(
        (subject) => !fixedSubjectIds.includes(subject.subjectId)
      ).length;

      return {
        ...student,
        unregisteredCount,
      };
    })
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">生徒名</TableHead>
            <TableHead className="font-bold">未登録の授業数</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentsWithUnregisteredLessons.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <Link href={`/admin/students/${student.id}`}>
                  {student.name}
                </Link>
              </TableCell>
              <TableCell>
                {student.unregisteredCount > 0
                  ? 
                  <Link href={`/admin/students/${student.id}`}>
                  <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full text-white">
                    {student.unregisteredCount}
                  </span>
                  </Link>
                  : "未登録の授業はありません"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
