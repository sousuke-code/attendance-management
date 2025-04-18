""

import { Teacher } from "@/db/schema/teacher"
import { Button } from "./ui/button"
import { Select, SelectContent,SelectTrigger  } from "./ui/select"



export default async function TeacherSelecter({ teachers} : { teachers: Teacher[]}) {
    <>
    <div>
        <Select>
            <SelectTrigger className="w-[180px]">
            </SelectTrigger>
        </Select>
    </div>
    </>
    

}