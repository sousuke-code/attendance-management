import { FC, ReactNode } from "react";
import Link from "next/link";

const ListItem: FC<{ href: string; children: ReactNode }> = ({
  children,
  href,
}) => (
  <li>
    <Link className="block px-4 py-2 border-b hover:bg-gray-300 font-bold text-lg" href={href}>
      {children}
    </Link>
  </li>
);

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-screen w-screen grid grid-rows-[auto,1fr] bg-customGray">
        {/* ヘッダーを入れたい */}
      <div className="grid grid-cols-[auto,1fr]"> 
        <div className="border-r">
          <nav>
            <ul className="font-bold">
              <ListItem href="/admin/shiftTrades">交換申請確認</ListItem>
              <ListItem href="/admin/shiftSwapLists">承諾待ち</ListItem>
              <ListItem href="/admin/teacher">講師管理</ListItem>
              <ListItem href="/admin/students">生徒管理</ListItem>
              <ListItem href="/admin/workRecords">事務記録</ListItem>
            </ul>
          </nav>
        </div>
      <div className="p-10">{children}</div>
      </div>
    </div>
  );
}
