import getAvailableSubjectsByStudent from "@/repositories/subject";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { getFixedShiftByStudent } from "@/repositories/shift";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  return [];
}

export default async function StudentPage({
  params,
}: {
  params: any;
}) {
  const id = Number(params.id);
  const subjects = await getAvailableSubjectsByStudent(id);
  const fixedShifts = await getFixedShiftByStudent(id);
  const fixedSubjectIds = fixedShifts.map((shift) => shift.subject);
  console.log(subjects);
  return (
    <>
      <h1 className="font-bold mb-2">受講科目一覧</h1>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>科目名</TableHead>
            <TableHead>教師名</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject) => {
            const alreadyFixed = fixedSubjectIds.includes(subject.subjectId);

            return (
              <TableRow key={subject.subjectId}>
                <TableCell>{subject.subjectName}</TableCell>
                <TableCell>
                  {alreadyFixed ? (
                    <span className="font-semibold">
                      すでに固定シフトに登録済み
                    </span>
                  ) : (
                    <Link
                      href={`/admin/students/${id}/availableTeachers?subjectId=${subject.subjectId}`}
                    >
                      <Button size="sm" className="bg-blue-600 font-bold ">
                        対応可能な講師を探す
                      </Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Link href={"/admin/students"}>
        <p className="text-sm mt-2 font-bold">生徒一覧に戻る</p>
      </Link>
    </>
  );
}
