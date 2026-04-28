"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Calendar,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MessageCircle,
  UserPlus,
  Package,
} from "lucide-react"

const stats = [
  { title: "总用户", value: "2,456", change: "+12.5%", up: true, icon: Users, color: "text-[#6366F1]", bg: "bg-[#F0F0FF]" },
  { title: "活动数量", value: "128", change: "+8.2%", up: true, icon: Calendar, color: "text-[#6366F1]", bg: "bg-[#F0F0FF]" },
  { title: "商城订单", value: "892", change: "+23.1%", up: true, icon: ShoppingBag, color: "text-[#6366F1]", bg: "bg-[#F0F0FF]" },
  { title: "总收入", value: "¥128,456", change: "+15.3%", up: true, icon: DollarSign, color: "text-[#6366F1]", bg: "bg-[#F0F0FF]" },
]

const recentActivities = [
  { title: "周末桌游社交局", organizer: "小明", registrations: 8, status: "报名中", time: "2小时前" },
  { title: "AI绘画入门分享会", organizer: "设计师阿杰", registrations: 56, status: "已满", time: "5小时前" },
  { title: "创业者下午茶", organizer: "Steven", registrations: 5, status: "报名中", time: "1天前" },
  { title: "户外徒步 - 塘朗山", organizer: "户外达人", registrations: 15, status: "进行中", time: "2天前" },
]

const recentOrders = [
  { id: "CP202604280001", user: "小陈", amount: 197, status: "已付款", time: "10分钟前" },
  { id: "CP202604280002", user: "阿花", amount: 99, status: "待付款", time: "30分钟前" },
  { id: "CP202604280003", user: "老王", amount: 299, status: "已发货", time: "2小时前" },
  { id: "CP202604280004", user: "小李", amount: 39, status: "已完成", time: "5小时前" },
]

const recentUsers = [
  { name: "设计师阿杰", role: "主理人", joined: "1小时前", activities: 3 },
  { name: "程序员小李", role: "用户", joined: "3小时前", activities: 0 },
  { name: "烘焙师小美", role: "主理人", joined: "5小时前", activities: 1 },
  { name: "英语老师Tom", role: "用户", joined: "1天前", activities: 2 },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#F0F0FF]/30">
      {/* 侧边栏 + 主内容 */}
      <div className="flex">
        {/* 侧边栏 */}
        <aside className="hidden md:flex w-64 bg-white border-r flex-col h-screen sticky top-0">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#6366F1] rounded-lg flex items-center justify-center text-white text-sm font-medium">社</div>
              <div>
                <p className="font-bold text-sm text-[#333]">管理后台</p>
                <p className="text-xs text-[#888]">社群主理人平台</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {[
              { href: "/admin", label: "数据概览", icon: Activity },
              { href: "/admin/users", label: "用户管理", icon: Users },
              { href: "/admin/activities", label: "活动管理", icon: Calendar },
              { href: "/admin/orders", label: "订单管理", icon: Package },
              { href: "/admin/stats", label: "数据统计", icon: TrendingUp },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  item.href === '/admin' ? 'bg-[#F0F0FF] text-[#6366F1]' : 'hover:bg-[#F0F0FF]/50 hover:text-[#6366F1] text-[#333]'
                }`}>
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <Link href="/">
              <button className="btn-secondary w-full text-sm">返回前台</button>
            </Link>
          </div>
        </aside>

        {/* 主内容 */}
        <main className="flex-1 p-6 md:p-10">
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-[#333]">数据概览</h1>
            <p className="text-[#888] mt-1 text-sm">欢迎回来，Steven</p>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((stat) => (
              <div key={stat.title} className="card-elegant p-6">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-[#333]">{stat.value}</p>
                  <p className="text-sm text-[#888]">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 最近活动 */}
            <div className="card-elegant">
              <div className="p-5 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-[#333]">最近活动</CardTitle>
                  <Link href="/admin/activities">
                    <button className="text-sm text-[#6366F1] hover:underline">查看全部</button>
                  </Link>
                </div>
              </div>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-[#333]">{activity.title}</p>
                      <p className="text-xs text-[#888]">by {activity.organizer} · {activity.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#888]">{activity.registrations}人</span>
                      <span className="tag-elegant text-[10px]">{activity.status}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </div>

            {/* 最近订单 */}
            <div className="card-elegant">
              <div className="p-5 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-[#333]">最近订单</CardTitle>
                  <Link href="/admin/orders">
                    <button className="text-sm text-[#6366F1] hover:underline">查看全部</button>
                  </Link>
                </div>
              </div>
              <CardContent className="space-y-4">
                {recentOrders.map((order, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm font-mono text-[#333]">{order.id}</p>
                      <p className="text-xs text-[#888]">{order.user} · {order.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-[#333]">¥{order.amount}</span>
                      <span className="tag-elegant text-[10px]">{order.status}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </div>

            {/* 新增用户 */}
            <div className="card-elegant">
              <div className="p-5 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold text-[#333]">新增用户</CardTitle>
                  <Link href="/admin/users">
                    <button className="text-sm text-[#6366F1] hover:underline">查看全部</button>
                  </Link>
                </div>
              </div>
              <CardContent className="space-y-4">
                {recentUsers.map((user, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#F0F0FF] rounded-full flex items-center justify-center text-[#6366F1] text-sm font-medium">
                      {user.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm text-[#333]">{user.name}</p>
                        <span className="tag-elegant text-[10px]">{user.role}</span>
                      </div>
                      <p className="text-xs text-[#888]">{user.joined} · {user.activities}个活动</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </div>

            {/* 快捷操作 */}
            <div className="card-elegant">
              <div className="p-5 pb-3">
                <CardTitle className="text-base font-semibold text-[#333]">快捷操作</CardTitle>
              </div>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/admin/users">
                    <button className="w-full h-20 flex flex-col items-center justify-center gap-2 rounded-xl border border-[#e5e5e5] hover:bg-[#F0F0FF] transition-colors">
                      <UserPlus className="h-5 w-5 text-[#6366F1]" />
                      <span className="text-xs text-[#333]">用户管理</span>
                    </button>
                  </Link>
                  <Link href="/admin/activities">
                    <button className="w-full h-20 flex flex-col items-center justify-center gap-2 rounded-xl border border-[#e5e5e5] hover:bg-[#F0F0FF] transition-colors">
                      <Calendar className="h-5 w-5 text-[#6366F1]" />
                      <span className="text-xs text-[#333]">活动审核</span>
                    </button>
                  </Link>
                  <Link href="/admin/orders">
                    <button className="w-full h-20 flex flex-col items-center justify-center gap-2 rounded-xl border border-[#e5e5e5] hover:bg-[#F0F0FF] transition-colors">
                      <Package className="h-5 w-5 text-[#6366F1]" />
                      <span className="text-xs text-[#333]">订单处理</span>
                    </button>
                  </Link>
                  <Link href="/admin/stats">
                    <button className="w-full h-20 flex flex-col items-center justify-center gap-2 rounded-xl border border-[#e5e5e5] hover:bg-[#F0F0FF] transition-colors">
                      <TrendingUp className="h-5 w-5 text-[#6366F1]" />
                      <span className="text-xs text-[#333]">数据报表</span>
                    </button>
                  </Link>
                </div>
              </CardContent>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
