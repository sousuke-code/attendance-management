"use server";
import { createSupabaseActionClient } from "../../../supabase/supabase";
import { redirect } from "next/navigation";

export default async function signOutAction() {
    const client = createSupabaseActionClient();
    const { error } = await client.auth.signOut();
    if (error) {
        console.error("Error signing out:", error);
    }
    redirect("/");
}