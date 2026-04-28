"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Search,
  Calendar,
  ShoppingBag,
  Shield,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react"

const activities = [
  { id: "1", title: "周末桌游社交局", organizer: "小明", type: "OFFLINE", status: "PUBLISHED", registrations: 8, max: 12, date: "5月1日" },
  { id: "2", title: "AI绘画入门分享会", organizer: "设计师阿杰", type: "ONLINE", status: "PUBLISHED", registrations: 56, max: 100, date: "5月3日" },
  { id: "3", title: "创业者下午茶", organizer: "Steven", type: "OFFLINE", status: "PUBLISHED", registrations: 5, max: 8, date: "5月5日" },
  { id: "4", title: "户外徒步 - 塘朗山", organizer: "户外达人", type: "OFFLINE", status: "DRAFT", registrations: 15, max: 20, date: "5月10日" },
  { id: "5", title: "React 技术分享会", organizer: "前端小哥", type: "HYBRID", status: "PUBLISHED", registrations: 32, max: 50, date: "5月12日" },
  { id: "6", title: "读书会 - 人类简史", organizer: "书虫小王", type: "OFFLINE", status: "CANCELLED", registrations: 10, max: 15, date: "5月15日" },
]

const statusLabels: Record<string, { label: string; color: string }> = {
  PUBLISHED: { label: "已发布", color: "bg-green-100 text-green-700" },
  DRAFT: { label: "草稿", color: "bg-gray-100 text-gray-500" },
  CANCELLED: { label: "已取消", color: "bg-red-100 text-red-700" },
}

const typeLabels: Record<string, string> = { ONLINE: "线上", OFFLINE: "线下", HYBRID: "混合" }

export default function AdminActivitiesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside className="hidden md:flex w-64 bg-white border-r flex-col h-screen sticky top-0">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white text-sm">社</div>
              <div><p className="font-bold text-sm">管理后台</p><p className="text-xs text-muted-foreground">社群主理人平台</p></div>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {[
              { href: "/admin", label: "数据概览", icon: Shield },
              { href: "/admin/users", label: "用户管理", icon: ShoppingBag },
              { href: "/admin/activities", label: "活动管理", icon: Calendar },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.href === '/admin/activities' ? 'bg-orange-50 text-orange-600' : 'hover:bg-orange-50 hover:text-orange-600'}`}>
                  <item.icon className="h-4 w-4" />{item.label}
                </button>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/admin"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
            <div><h1 className="text-2xl font-bold">活动管理</h1><p className="text-muted-foreground text-sm">共 {activities.length} 个活动</p></div>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索活动..." className="pl-10" />
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">活动</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">类型</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">状态</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">报名</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">日期</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((act) => (
                    <tr key={act.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-sm">{act.title}</p>
                          <p className="text-xs text-muted-foreground">by {act.organizer}</p>
                        </div>
                      </td>
                      <td className="p-4"><Badge variant="outline" className="text-xs">{typeLabels[act.type]}</Badge></td>
                      <td className="p-4"><Badge className={`${statusLabels[act.status].color} border-0 text-xs`}>{statusLabels[act.status].label}</Badge></td>
                      <td className="p-4 text-sm">{act.registrations}/{act.max}</td>
                      <td className="p-4 text-sm text-muted-foreground">{act.date}</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                          {act.status === "DRAFT" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500"><CheckCircle2 className="h-4 w-4" /></Button>
                          )}
                          {act.status === "PUBLISHED" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><XCircle className="h-4 w-4" /></Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
