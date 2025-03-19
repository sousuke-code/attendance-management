"use server"

import { findAvailableTeachers } from "@/domains/teacher/findAvailableTeachers"

export default async function avilaibleTeachersAction(formData: FormData) {
    const subjectId = Number(formData.get("subjectId"))
    const shiftDate = formData.get("shiftDate") as string | null;
    const shiftOptionId = Number(formData.get("shiftOptionId"));
    if (!shiftDate) throw new Error("Invalid shiftDate");

   const teachers = await findAvailableTeachers(subjectId, new Date(shiftDate as string), shiftOptionId);   
   console.log(teachers);
}
  
