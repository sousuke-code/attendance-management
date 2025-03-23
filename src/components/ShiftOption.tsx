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
import { useState } from "react";

export default function ShiftOption({shiftOptions} : {shiftOptions: ShiftOption[]}) {
  const [selectedShiftTime, setSelectedShiftTime] = useState<string>("");

  return (
    <>
    <Select onValueChange={(value) => setSelectedShiftTime(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="曜日を選択" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>シフト時間の選択</SelectLabel>
          {shiftOptions.map((shiftOption) => (
            <SelectItem value={String(shiftOption.id)}>{shiftOption.shiftTime}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    <input type="hidden" name="shiftTimeId" value={selectedShiftTime} />
    </>
  );
}
