"use client";

import { useState, useMemo } from "react";
import { Checkbox } from "../ui/checkbox";
import { Toaster } from "sonner";
import { ShiftSwapDetail } from "@/db/schema/shift";
import ShiftSwapListsTable from "./ShiftSwapListsTable";
import { subDays } from "date-fns";

export default function FilteredShiftSwapLists({
  shiftSwapLists,
}: {
  shiftSwapLists: ShiftSwapDetail[];
}) {
  const [ isFilterd, setIsFiltered ]  = useState(false);;

  const filtered = useMemo(() => {
    if(!isFilterd) return shiftSwapLists;

    const oneWeekAgo = subDays(new Date(), 7);
    return shiftSwapLists.filter((shift) => {
        return new Date(shift.shiftDate) > oneWeekAgo && new Date(shift.shiftDate) < new Date();
    });
  }, [isFilterd, shiftSwapLists]);
  return (

    <>
      <h1 className="text-2xl font-bold mb-4">シフト交換申請一覧</h1>
      <Toaster position="top-right" theme="light" />
      <div className="flex gap-2 items-center mb-2">
        <Checkbox 
            checked={isFilterd}
            onCheckedChange={() => setIsFiltered(!isFilterd)}
        />
        <p className="font-bold text-sm">一週間以内の申請に絞る</p>
      </div>
      <ShiftSwapListsTable shiftSwapLists={filtered} />
    </>
  );
}
