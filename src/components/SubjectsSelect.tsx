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
import type { Subject } from "@/db/schema/subject";
import { useState } from "react";

export default function SubjectsSelect({subjects} : {subjects: Subject[]}) {
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  return (
    <>
    <Select onValueChange={(value) => setSelectedSubject(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="曜日を選択" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>科目時間の選択</SelectLabel>
          {subjects.map((subject) => (
            <SelectItem value={String(subject.id)}>{subject.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    <input type="hidden" name="subjectId" value={selectedSubject} />
    </>
  );
}

