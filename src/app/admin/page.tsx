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
import { client } from "../../../supabase/supabase";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
export const dynamic = "force-dynamic";


export default async function AdminPage() {
  const shiftSwapLists = await getShiftSwapLists();
  console.log(shiftSwapLists);
  return (
    <>

     
      
    </>
  );
}
