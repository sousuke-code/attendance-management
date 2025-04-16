import Link from "next/link";
import { Sidebar,SidebarContent,SidebarFooter,SidebarGroupLabel, SidebarHeader,SidebarGroup,SidebarMenuItem,SidebarMenuButton } from "./ui/sidebar";


export default function SideBarMenu() {
    return (
        <Sidebar className="font-bold">
            <SidebarHeader>
                <h1 className="text-2xl font-bold">管理者メニュー</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold ">シフト交換</SidebarGroupLabel>
                        <Link href="/admin/shiftTrades">交換申請確認</Link>
                        <Link href="/admin/shiftSwapLists">承諾待ち</Link>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold">生徒・講師管理</SidebarGroupLabel>
                    <Link href="/admin/teacher">講師管理</Link>
                    <Link href="/admin/students">生徒管理</Link>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="font-bold">事務記録</SidebarGroupLabel>
                    <Link href="/admin/workRecords">事務記録</Link>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}