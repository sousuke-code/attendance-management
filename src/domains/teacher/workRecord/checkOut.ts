import ShiftTradePage from "@/app/admin/shiftTrades/[id]/page";
import { findAttendanceByTeacherId } from "@/repositories/attendace";
import { getShiftsByTeacher } from "@/repositories/shift";
import { differenceInMinutes, format,parse } from "date-fns";
import { substractRanges } from "./substractRanges";


export async function checkOut(teacherId: number){
    const now = new Date();

    const attendance = await findAttendanceByTeacherId(teacherId);
    const date = format(attendance[0].checkIn, "yyyy-MM-dd");
    const checkIn = attendance[0].checkIn;
    const startTime = format(attendance[0].checkIn, "HH:mm:ss ");

    const workRange = {
        start: checkIn,
        end: now,
    }

    //その日のシフトを取得
    const shifts = await getShiftsByTeacher(teacherId, date);

    const shiftRanges = shifts.map((shift) => ({
        start: parse(`${shift.shiftDate} ${shift.startTime}`, "yyyy-MM-dd HH:mm:ss", new Date()),
        end: parse(`${shift.shiftDate} ${shift.endTime}`, "yyyy-MM-dd HH:mm:ss", new Date()),
    }));

    const officeTimeRanges = substractRanges(workRange, shiftRanges);

    const officeTimeWithMinutes = officeTimeRanges.map((range) => ({
        ...range,
        minutes: differenceInMinutes(range.end, range.start),
    }));

    const totalOfficeMinutes = officeTimeWithMinutes.reduce(
        (sum, r) => sum + r.minutes,
        0
    );

    if(officeTimeWithMinutes.length > 0){
        return {
            needsInput: true,
            officeTime: officeTimeWithMinutes,
            attendanceId: attendance[0].id,
        };
    }


    
    


}
