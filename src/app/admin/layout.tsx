import { FC, ReactNode } from "react";
import { SidebarProvider,SidebarTrigger } from "@/components/ui/sidebar";
import SideBarMenu from "@/components/SideBarMenu";
import { createSupabaseComponentClient } from "../../../supabase/supabase";
import { redirect } from "next/navigation";


export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const client = createSupabaseComponentClient();
  const session = await client.auth.getSession();
  if(!session.data.session){
    redirect("/login");
  }
  return (
    <SidebarProvider>
      <SideBarMenu />
        <SidebarTrigger size="lg" />
       
      <main className="p-10 w-full">
        { children }
      </main>
    </SidebarProvider>
  );
}
