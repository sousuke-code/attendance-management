"use server";
import { createSupabaseActionClient } from "../../../supabase/supabase";

export default async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if(!email || !password){
    throw new Error("入力されていません");
  }
  const client = createSupabaseActionClient();
  const { data, error} = await client.auth.signUp({ email, password });
  if (error) {
    console.error("Error signing in:", error);
  }
  console.log("data", data);
}