import Link from "next/link";
import { createSupabaseComponentClient } from "../../supabase/supabase";
import { redirect } from "next/navigation";

export default async function Page() {
  const client = createSupabaseComponentClient();
  const session = await client.auth.getSession();
  if(session.data.session){
    redirect("/admin");
  } else{
    redirect("/login");
  }
  return (
    <div>
      <Link href={"/admin"} className="block px-4 py-2 border-b hover:bg-gray-300 font-bold text-lg">
      管理者ページに行く
      </Link>
        
    </div>
  )
}
