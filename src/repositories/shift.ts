import { eq, and, inArray,aliasedTable } from "drizzle-orm";
import { db } from "../../db";
import { shifts, shiftOptions, shiftSwapLists } from "@/db/schema/shift";
import { Id } from "@slack/web-api/dist/types/response/RtmStartResponse";
import { students } from "@/db/schema/student";
import type { ShiftsSlack } from "../../lib/ResultModalSlack";
import { subjects } from "@/db/schema/subject";
import { teachers } from "@/db/schema/teacher";
import { create } from "domain";

export async function getShiftOptions() {
  return db.select().from(shiftOptions);
}

// export async function getShiftById(Id:number){
//   return db.select().from(shifts).where(eq(shiftOptions))
// }

export async function createShiftSwapList(shiftId: number, studentId: number,reeason: string) {
  const targetShiftSwapList = await db.select().from(shiftSwapLists).where(eq(shiftSwapLists.id, shiftId));

  if(targetShiftSwapList.length > 0){
    throw new Error("すでに交換リストが存在しています");
  }
  
  return db.insert(shiftSwapLists).values({
    shiftId: shiftId,
    studentsId: studentId,
    reason: reeason,
    status: "pending",
  });
}


export async function getShift(shiftId: number){
  return db.select({
    id: shifts.id,
    date: shifts.date,
    shiftId: shifts.shiftId,
    shiftTime: shiftOptions.shiftTime,
    studentId: shifts.studentId,
    studentName: students.name,
    subjectId: shifts.subjectId,
    subjectName: subjects.name,
    seatId: shifts.seatId,
    createdAt: shifts.createdAt,
    updatedAt: shifts.updatedAt,
  }).from(shifts)
  .leftJoin(students, eq(shifts.studentId, students.id))
  .leftJoin(subjects, eq(shifts.subjectId, subjects.id))
  .leftJoin(shiftOptions, eq(shifts.shiftId, shiftOptions.id))
  .where(eq(shifts.id, shiftId));
}


export async function findShift(
  studentId: number,
  date: Date,
  shiftId: number
) {
  const filters = [];

  if(studentId){
    filters.push(eq(shifts.studentId, studentId));
  }

  if(date){
    filters.push(eq(shifts.date, date.toLocaleString()));
  }

  if(shiftId){
    filters.push(eq(shifts.shiftId, shiftId));
  }

  return await db
    .select()
    .from(shifts)
    .where(and(...filters));
}

export async function findShifts(
  studentIds: number[],
  date: Date,
  shiftIds: number[]
): Promise<ShiftsSlack[]> {
  const filters = [];

  if (studentIds.length > 0) {
    filters.push(inArray(shifts.studentId, studentIds));
  }

  if (shiftIds.length > 0) {
    filters.push(inArray(shifts.shiftId, shiftIds));
  }

  if (date) {
    filters.push(eq(shifts.date, date.toLocaleString()));
  }

  return await db
    .select({
      id: shifts.id,
      date: shifts.date,
      shiftId: shifts.shiftId,
      shiftTime: shiftOptions.shiftTime,
      studentId: shifts.studentId,
      studentName: students.name,
      subjectId: shifts.subjectId,
      subjectName: subjects.name,
      createdAt: shifts.createdAt,
      updatedAt: shifts.updatedAt,
      seatId: shifts.seatId,
    })
    .from(shifts)
    .leftJoin(students, eq(shifts.studentId, students.id))
    .leftJoin(subjects, eq(shifts.subjectId, subjects.id))
    .leftJoin(shiftOptions, eq(shifts.shiftId, shiftOptions.id))
    .where(and(...filters));
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


export async function updateSwapListsStatus(id: number){
  return db.update(shiftSwapLists).set({ status: "applying" }).where(eq(shiftSwapLists.id, id));
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
