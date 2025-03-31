"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type{ ShiftOption } from "@/db/schema/shift";
import type { Student } from "@/db/schema/student";
import { useState } from "react";

export default function StudentsSelect({students} : {students: Student[]}) {
  const [selectedStudent, setSelectedStudent] = useState<string>("");

  return (
    <>
    <Select onValueChange={(value) => setSelectedStudent(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="曜日を選択" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>生徒の選択</SelectLabel>
          {students.map((student) => (
            <SelectItem value={String(student.id)}>{student.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    <input type="hidden" name="studentId" value={selectedStudent} />
    </>
  );
}
