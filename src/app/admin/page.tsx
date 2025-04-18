
import { getShiftSwapLists } from "@/repositories/shift";
export const dynamic = "force-dynamic";


export default async function AdminPage() {
  const shiftSwapLists = await getShiftSwapLists();
  console.log(shiftSwapLists);
  
  return (
    <>

     
      
    </>
  );
}
