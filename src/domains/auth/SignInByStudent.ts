import { db } from "../../../db";
import { students,studentEntries } from "@/db/schema/student";
import { eq,desc,asc } from "drizzle-orm";
import { z }  from "zod";


export default async function SignInByStuden(id: string, password: string) {
   const student = await db.select().from(students).where(eq(students.code, id));  

   if(student.length === 0){
    throw new Error("IDが間違っています");
   }

   if(student[0].password !== password) {
    throw new Error("パスワードが間違っています")
   }

   const entries = await db.select().from(studentEntries).where(eq(studentEntries.studentId,student[0].id)).orderBy(desc(studentEntries.checkInTime)).limit(1);   
   if(entries[0].checkInTime) {
    throw new Error("すでに入室済みです");
   }
   if(student[0].password === password) {
     await db.insert(studentEntries).values({
         studentId: student[0].id,
         checkInTime: new Date(),
     })
   }else {
         throw new Error("ログインに失敗しました");
   }
}
