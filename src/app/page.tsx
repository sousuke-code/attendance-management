import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Link href={"/admin/session"} className="block px-4 py-2 border-b hover:bg-gray-300 font-bold text-lg">
      管理者ページに行く
      </Link>
        
    </div>
  )
}
