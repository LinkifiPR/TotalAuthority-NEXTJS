"use client";


import {
  Home,
  FileText,
  Settings,
  Users,
  BarChart3,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Audit Reports",
    url: "/admin/audits",
    icon: BarChart3,
  },
  {
    title: "Users",
    url: "/admin/users", 
    icon: Users,
  },
  {
    title: "Blog Posts",
    url: "/admin/posts",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
