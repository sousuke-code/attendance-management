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
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">日時</TableHead>
            <TableHead className="font-bold">時間</TableHead>
            <TableHead className="font-bold">コマ</TableHead>
            <TableHead className="font-bold">生徒名</TableHead>
            <TableHead className="font-bold">申請講師名</TableHead>
            <TableHead className="font-bold">科目</TableHead>
            <TableHead className="font-bold">申請理由</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-bold">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="">$250.00</TableCell>
            <TableCell className="">$250.00</TableCell>
            <TableCell className="">$250.00</TableCell>
            <TableCell className="">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
