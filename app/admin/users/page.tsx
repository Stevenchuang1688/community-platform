"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Search,
  ArrowLeft,
  Shield,
  Ban,
  CheckCircle2,
  Calendar,
  ShoppingBag,
} from "lucide-react"

const mockUsers = [
  { id: "1", name: "Steven Chuang", email: "steven@yujian.space", role: "ORGANIZER", status: "ACTIVE", joined: "2026-01-15", activities: 24, orders: 8 },
  { id: "2", name: "设计师阿杰", email: "jie@design.com", role: "ORGANIZER", status: "ACTIVE", joined: "2026-02-20", activities: 5, orders: 12 },
  { id: "3", name: "程序员小李", email: "li@code.com", role: "USER", status: "ACTIVE", joined: "2026-03-01", activities: 0, orders: 3 },
  { id: "4", name: "烘焙师小美", email: "mei@bake.com", role: "ORGANIZER", status: "ACTIVE", joined: "2026-03-10", activities: 2, orders: 1 },
  { id: "5", name: "英语老师Tom", email: "tom@english.com", role: "USER", status: "SUSPENDED", joined: "2026-03-15", activities: 0, orders: 0 },
  { id: "6", name: "运营达人", email: "ops@master.com", role: "ORGANIZER", status: "ACTIVE", joined: "2026-03-20", activities: 8, orders: 15 },
]

export default function AdminUsersPage() {
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState("all")

  const filtered = mockUsers.filter((u) => {
    const matchSearch = u.name.includes(search) || u.email.includes(search)
    if (tab === "all") return matchSearch
    if (tab === "organizer") return matchSearch && u.role === "ORGANIZER"
    if (tab === "suspended") return matchSearch && u.status === "SUSPENDED"
    return matchSearch
  })

  return (
    <div className="min-h-screen bg-[#F5F1E9]">
      <div className="flex">
        <aside className="hidden md:flex w-64 bg-white border-r border-[#e5e0d5] flex-col h-screen sticky top-0">
          <div className="p-6 border-b border-[#e5e0d5]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2C4A46] rounded-lg flex items-center justify-center text-white text-sm font-medium">社</div>
              <div>
                <p className="font-bold text-sm text-[#2C4A46]">管理后台</p>
                <p className="text-xs text-[#8a9490]">社群主理人平台</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {[
              { href: "/admin", label: "数据概览", icon: Shield },
              { href: "/admin/users", label: "用户管理", icon: Users },
              { href: "/admin/activities", label: "活动管理", icon: Calendar },
              { href: "/admin/orders", label: "订单管理", icon: ShoppingBag },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.href === '/admin/users' ? 'bg-[#2C4A46]/10 text-[#2C4A46]' : 'text-[#5a6b66] hover:bg-[#2C4A46]/5 hover:text-[#2C4A46]'}`}>
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/admin">
              <Button variant="ghost" size="icon" className="text-[#2C4A46] hover:bg-[#2C4A46]/5"><ArrowLeft className="h-5 w-5" /></Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#2C4A46]">用户管理</h1>
              <p className="text-[#8a9490] text-sm">共 {mockUsers.length} 个用户</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a9490]" />
              <Input placeholder="搜索用户..." className="input-elegant pl-10 border-[#d4cfc5] focus:border-[#2C4A46] focus:ring-[#2C4A46]/20" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="bg-[#2C4A46]/5 border-[#d4cfc5]">
                <TabsTrigger value="all" className="data-[state=active]:bg-[#2C4A46] data-[state=active]:text-white">全部</TabsTrigger>
                <TabsTrigger value="organizer" className="data-[state=active]:bg-[#2C4A46] data-[state=active]:text-white">主理人</TabsTrigger>
                <TabsTrigger value="suspended" className="data-[state=active]:bg-[#2C4A46] data-[state=active]:text-white">已封禁</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Card className="card-elegant border-[#d4cfc5] shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e5e0d5] bg-[#2C4A46]/[0.03]">
                      <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">用户</th>
                      <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">角色</th>
                      <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">状态</th>
                      <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">活动</th>
                      <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">订单</th>
                      <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">注册时间</th>
                      <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((user) => (
                      <tr key={user.id} className="border-b border-[#e5e0d5] hover:bg-[#F5F1E9]/70 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs bg-[#2C4A46]/10 text-[#2C4A46]">{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm text-[#2C4A46]">{user.name}</p>
                              <p className="text-xs text-[#8a9490]">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={`tag-elegant border-0 text-xs ${user.role === "ORGANIZER" ? "bg-[#2C4A46]/10 text-[#2C4A46]" : "bg-[#d4cfc5]/60 text-[#5a6b66]"}`}>
                            {user.role === "ORGANIZER" ? "主理人" : "用户"}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={`tag-elegant border-0 text-xs ${user.status === "ACTIVE" ? "bg-[#2C4A46]/10 text-[#2C4A46]" : "bg-red-50 text-red-600"}`}>
                            {user.status === "ACTIVE" ? "正常" : "封禁"}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-[#3d5753]">{user.activities}</td>
                        <td className="p-4 text-sm text-[#3d5753]">{user.orders}</td>
                        <td className="p-4 text-sm text-[#8a9490]">{user.joined}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            {user.status === "ACTIVE" ? (
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                                <Ban className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-[#2C4A46] hover:text-[#1e3632] hover:bg-[#2C4A46]/5">
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
