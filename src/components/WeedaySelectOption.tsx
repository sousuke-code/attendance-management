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
import { useState } from "react";

export default function WeekdaySelectOption() {
  const [selectedDay, setSelectedDay] = useState<string>("");

  return (
    <>
    <Select onValueChange={(value) => setSelectedDay(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="曜日を選択" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>曜日</SelectLabel>
          <SelectItem value="1">月曜日</SelectItem>
          <SelectItem value="2">火曜日</SelectItem>
          <SelectItem value="3">水曜日</SelectItem>
          <SelectItem value="4">木曜日</SelectItem>
          <SelectItem value="5">金曜日</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <input type="hidden" name="weekday" value={selectedDay} />
    </>
  );
}
