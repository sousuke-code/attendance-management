import { createAttendance } from "@/repositories/attendace";



export async function checkIn(teacherId: number){
    const now = new Date();
    await createAttendance(teacherId, now);
}
