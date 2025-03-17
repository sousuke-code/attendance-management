import { eq, and, inArray,aliasedTable } from "drizzle-orm";
import { DB, db } from "../../db";
import { shifts, shiftOptions, shiftSwapLists } from "@/db/schema/shift";
import { Id } from "@slack/web-api/dist/types/response/RtmStartResponse";
import { students } from "@/db/schema/student";
import { subjects } from "@/db/schema/subject";
import { teachers } from "@/db/schema/teacher";
import { create } from "domain";
import { shiftDetails } from "@/db/schema/shift";
import type { ShiftDetail } from "@/db/schema/shift";
import type { ShiftSwapDetail } from "@/db/schema/shift";
import { shiftSwapDetails } from "@/db/schema/shift";


export async function getShiftOptions() {
  return db.select().from(shiftOptions);
}

// export async function getShiftById(Id:number){
//   return db.select().from(shifts).where(eq(shiftOptions))
// }

export async function getShiftDetailsById(id:number){
  return db.select().from(shiftDetails).where(eq(shiftDetails.id,id))
}


export async function getShiftById(id: number) {
  return (await db.select().from(shifts).where(eq(shifts.id, id)));
}

export async function getShiftOptionById(id: number){
  return db.select().from(shiftOptions).where(eq(shiftOptions.id, id));
}

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
    return db.select().from(shiftSwapDetails).where(eq(shiftSwapDetails.status, "pending"));
}

export async function getShiftSwapListsByIds(ids:number[]): Promise<ShiftSwapDetail[]>{

  return db.select().from(shiftSwapDetails).where(inArray(shiftSwapDetails.id, ids));
}

export async function getRecurutingShiftSwapList(){
  return db.select().from(shiftSwapDetails).where(eq(shiftSwapDetails.status, "pending"));
}


export async function updateSwapListsStatus(id: number, reciverId: number){
  return db.update(shiftSwapLists).set({ status: "applying", receiverId: reciverId},).where(eq(shiftSwapLists.id, id));
}

export async function updateSwapListsStatusToRejected(tx:DB ,id:number){
  return db.update(shiftSwapLists).set({ status: "rejected"}).where(eq(shiftSwapLists.shiftId, id));
}


export async function getSwapListsForWaiting(){
  return db.select().from(shiftSwapDetails).where(eq(shiftSwapDetails.status, "applying"));
}
