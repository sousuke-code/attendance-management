import { getShiftDetailsById } from "@/repositories/shift"
import { Button } from "@/components/ui/button";
import avilaibleTeachersAction from "@/actions/teacher/availableTeachersAction";
import { 
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow
} from "@/components/ui/table";
import { findAvailableTeachers } from "@/domains/teacher/findAvailableTeachers";
import { shiftSwapLists } from "@/db/schema/shift";
import { Checkbox } from "@/components/ui/checkbox";
import sendMessageToTeachersAction from "@/actions/slack/sendMessageToTeachersAction";


export default async function ShiftTradePage({params} : {params: {id : string}}){
    const id = Number(params.id);
    const shifts = await getShiftDetailsById(id);
    console.log(shifts);
    const date = new Date(shifts[0].shiftDate);
    const teachers = await findAvailableTeachers(shifts[0].subjectId, date, shifts[0].shiftOptionId);    
    console.log(teachers);
    return (
        <>

         <h1>候補教師一覧</h1>
         <form action={sendMessageToTeachersAction}>
          <input type="hidden" name="shiftId" value={shifts[0].id} />
         <Button>該当講師にメッセージを送る</Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>講師名</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>所持ポイント</TableHead>
              </TableRow>
            </TableHeader>
            { teachers.map((teacher) =>(
            <TableBody>
              <TableRow>
              <TableCell>
                <Checkbox name="teacherIds" value={teacher.id}/>
              </TableCell>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.point}</TableCell>
              </TableRow>
            </TableBody>
            ))

            }

          </Table>
         </form>
        </>
    )

}
