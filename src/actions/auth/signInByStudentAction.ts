"use server";

import SignInByStuden from "@/domains/auth/SignInByStudent";

export default async function signInByStudentAction(formData: FormData){
   const id = formData.get("id") as string;
   const password = formData.get("password") as string;
   await SignInByStuden(id, password);

}
