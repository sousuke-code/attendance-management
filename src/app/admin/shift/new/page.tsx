import CreateNewShiftForm from "@/components/shift/CreateNewShiftForm"
import type { ShiftsSlack } from "../../../../../lib/ResultModalSlack"
import { SearchParams } from "next/dist/server/request/search-params";
import { getShift } from "@/repositories/shift";
import ShiftCard from "@/components/shift/ShiftCard";



export default async function createShiftSwapList(
    props:  {
        searchParams: Promise<{
            id: string;
        }>
    }
){
    const searchParams = await props.searchParams;
    const id = searchParams?.id;


    return (
        <>
          <div>
          <CreateNewShiftForm  />
          </div>
          {id ? 
          <div className="container  items-center justify-center mt-10 py-10 font-bold">
              <ShiftCard id={id.toString()} />
          </div>
           : null}
        </>
    )

}
