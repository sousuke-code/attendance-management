import { eq, and, inArray,aliasedTable } from "drizzle-orm";
import { db } from "../../db";
import { shifts, shiftOptions, shiftSwapLists } from "@/db/schema/shift";
import { Id } from "@slack/web-api/dist/types/response/RtmStartResponse";
import { students } from "@/db/schema/student";
import { subjects } from "@/db/schema/subject";
import { teachers } from "@/db/schema/teacher";
import { create } from "domain";
import { shiftDetails } from "@/db/schema/shift";
import type { ShiftDetail } from "@/db/schema/shift";

export async function getShiftOptions() {
  return db.select().from(shiftOptions);
}

// export async function getShiftById(Id:number){
//   return db.select().from(shifts).where(eq(shiftOptions))
// }

export async function createShiftSwapList(shiftId: number, studentId: number,reeason: string,teacherId: number) {
  return db.insert(shiftSwapLists).values({
    shiftId: shiftId,
    requesterId: teacherId,
    studentsId: studentId,
    reason: reeason,
    status: "pending",
  });
}

export async function findShifts(
  studentIds: number[],
  date: Date,
  shiftIds: number[]
): Promise<ShiftDetail[]> {
  const filters = [];

  if (shiftIds.length > 0) {
    filters.push(inArray(shiftDetails.shiftOptionId, shiftIds));
  }

  if (date) {
    filters.push(eq(shiftDetails.shiftDate, date.toLocaleString()));
  }

  return await db
    .select()
    .from(shiftDetails)
    .where(and(...filters));
}


export async function findShiftsByUser(email: string, shiftOption: number[], shiftDate: Date) : Promise<ShiftDetail[]>{
  const filter = [];

  if(shiftOption.length > 0){
    filter.push(inArray(shiftDetails.shiftOptionId, shiftOption));
  }

  return db.select()
  .from(shiftDetails)
  .where(and(eq(shiftDetails.teacherEmail, email), eq(shiftDetails.shiftDate, shiftDate.toLocaleString()), ...filter));
}


export async function getShiftSwapLists(){
    const requesters = aliasedTable(teachers, "requesters");
    const receivers = aliasedTable(teachers, "receivers");
    return db.select({
        id: shiftSwapLists.id,
        requesterId: shiftSwapLists.requesterId,
        requesterName: requesters.name,
        receiverId: shiftSwapLists.receiverId,
        receiverName: receivers.name,
        studentId: students.id,
        studentName: students.name,
        shiftId: shiftSwapLists.shiftId,
        shiftDate: shifts.date,
        shiftTime: shiftOptions.shiftTime,
        subjectId: shifts.subjectId,
        subjectsName: subjects.name,
        reason: shiftSwapLists.reason,
        status: shiftSwapLists.status,
    })
    .from(shiftSwapLists)
    .leftJoin(requesters, eq(shiftSwapLists.requesterId, requesters.id))
    .leftJoin(receivers, eq(shiftSwapLists.receiverId, receivers.id))
    .leftJoin(shifts, eq(shiftSwapLists.shiftId, shifts.id))
    .leftJoin(subjects, eq(shifts.subjectId, subjects.id))
    .leftJoin(shiftOptions, eq(shifts.shiftId, shiftOptions.id))
    .leftJoin(students, eq(shiftSwapLists.studentsId, students.id));
}


export async function getRecurutingShiftSwapList(){
  const requesters = aliasedTable(teachers, "requesters");
  const receivers = aliasedTable(teachers, "receivers");
  return db.select({
      id: shiftSwapLists.id,
      requesterId: shiftSwapLists.requesterId,
      requesterName: requesters.name,
      receiverId: shiftSwapLists.receiverId,
      receiverName: receivers.name,
      studentId: students.id,
      studentName: students.name,
      shiftId: shiftSwapLists.shiftId,
      shiftDate: shifts.date,
      shiftTime: shiftOptions.shiftTime,
      subjectId: shifts.subjectId,
      subjectsName: subjects.name,
      reason: shiftSwapLists.reason,
      status: shiftSwapLists.status,
  })
  .from(shiftSwapLists)
  .leftJoin(requesters, eq(shiftSwapLists.requesterId, requesters.id))
  .leftJoin(receivers, eq(shiftSwapLists.receiverId, receivers.id))
  .leftJoin(shifts, eq(shiftSwapLists.shiftId, shifts.id))
  .leftJoin(subjects, eq(shifts.subjectId, subjects.id))
  .leftJoin(shiftOptions, eq(shifts.shiftId, shiftOptions.id))
  .leftJoin(students, eq(shiftSwapLists.studentsId, students.id))
  .where(eq(shiftSwapLists.status, "pending"));
}


export async function updateSwapListsStatus(id: number, reciverId: number){
  return db.update(shiftSwapLists).set({ status: "applying", receiverId: reciverId},).where(eq(shiftSwapLists.id, id));

}


export async function getSwapListsForWaiting(){
  const requesters = aliasedTable(teachers, "requesters");
  const receivers = aliasedTable(teachers, "receivers");
  return db.select({
      id: shiftSwapLists.id,
      requesterId: shiftSwapLists.requesterId,
      requesterName: requesters.name,
      receiverId: shiftSwapLists.receiverId,
      receiverName: receivers.name,
      studentId: students.id,
      studentName: students.name,
      shiftId: shiftSwapLists.shiftId,
      shiftDate: shifts.date,
      shiftTime: shiftOptions.shiftTime,
      subjectId: shifts.subjectId,
      subjectsName: subjects.name,
      reason: shiftSwapLists.reason,
      status: shiftSwapLists.status,
  })
  .from(shiftSwapLists)
  .leftJoin(requesters, eq(shiftSwapLists.requesterId, requesters.id))
  .leftJoin(receivers, eq(shiftSwapLists.receiverId, receivers.id))
  .leftJoin(shifts, eq(shiftSwapLists.shiftId, shifts.id))
  .leftJoin(subjects, eq(shifts.subjectId, subjects.id))
  .leftJoin(shiftOptions, eq(shifts.shiftId, shiftOptions.id))
  .leftJoin(students, eq(shiftSwapLists.studentsId, students.id))
  .where(eq(shiftSwapLists.status, "applying"));
}
