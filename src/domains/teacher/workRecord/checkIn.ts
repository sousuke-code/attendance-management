import { createAttendance, findAttendanceByTeacherId } from "@/repositories/attendace";



export async function checkIn(teacherId: number){
    const now = new Date();
    const attendance = await findAttendanceByTeacherId(teacherId);
    if(!attendance[0].checkOut){
        return { message: "既に出勤しています"};
    }
    await createAttendance(teacherId, now);
}
