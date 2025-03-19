import { teachersSubjects } from "@/db/schema/subject";
import { db } from "../../../db";
import { eq,and, notInArray, inArray } from "drizzle-orm";
import { shifts } from "@/db/schema/shift";
import { teachers } from "@/db/schema/teacher";


export async function findAvailableTeachers(subjectId: number, date: Date, shiftOptionId: number){
   const subjectTeahers = await db
     .select()
     .from(teachersSubjects)
     .where(eq(teachersSubjects.subjectsId, subjectId));

    const teacherIds = subjectTeahers.map((row) => row.teacherId);

    if(teacherIds.length === 0){
        return [];
    }

    const busyTeachers = await db
    .select()
    .from(shifts)
    .where(
        and(
            eq(shifts.date, date.toLocaleString()),
            eq(shifts.shiftId, shiftOptionId)
        )
    )

    const busyTeacherIds = busyTeachers.map((row) => row.teacherId).filter((id): id is number => id !== null);

    const availableTeachers = await db
     .select()
     .from(teachers)
     .where(
        and(
            notInArray(teachers.id, busyTeacherIds),
            inArray(teachers.id, teacherIds)
        )
     )

//   console.log(availableTeachers);
  return availableTeachers;
}
