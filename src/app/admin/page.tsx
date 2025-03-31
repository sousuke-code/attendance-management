import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getShiftSwapLists } from "@/repositories/shift";

export default async function AdminPage() {
  const shiftSwapLists = await getShiftSwapLists();
  console.log(shiftSwapLists);
  return (
    <>
      
    </>
  );
}
