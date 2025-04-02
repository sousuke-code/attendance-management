  import { getShiftSwapLists } from "@/repositories/shift";
  import FilteredShiftSwapLists from "@/components/shift/FilterShiftSwapListsClient";

  export default async function AdminPage() {
    const shiftSwapLists = await getShiftSwapLists();
    console.log(shiftSwapLists);
    return (
      <>
       <FilteredShiftSwapLists shiftSwapLists={shiftSwapLists} />
      </>
    );
  }

