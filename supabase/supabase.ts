import { cookies } from "next/headers";
import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { DB } from "../db";

export function createSupabaseActionClient() {
    return createServerActionClient<DB>({ cookies });
}

export function createSupabaseComponentClient() {
    return createServerComponentClient<DB>({ cookies }); 
}
