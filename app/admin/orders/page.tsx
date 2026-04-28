"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Shield, Calendar, ShoppingBag, Package, Eye, Truck } from "lucide-react"

const orders = [
  { id: "CP202604280001", user: "小陈", amount: 197, status: "PAID", items: 2, method: "微信支付", time: "10分钟前" },
  { id: "CP202604280002", user: "阿花", amount: 99, status: "PENDING", items: 1, method: "支付宝", time: "30分钟前" },
  { id: "CP202604280003", user: "老王", amount: 299, status: "SHIPPED", items: 1, method: "微信支付", time: "2小时前" },
  { id: "CP202604280004", user: "小李", amount: 39, status: "DELIVERED", items: 1, method: "余额", time: "5小时前" },
  { id: "CP202604280005", user: "Lisa", amount: 69, status: "REFUNDING", items: 1, method: "微信支付", time: "1天前" },
]

const statusMap: Record<string, { label: string; color: string }> = {
  PENDING: { label: "待付款", color: "bg-amber-100 text-amber-700" },
  PAID: { label: "已付款", color: "bg-blue-100 text-blue-700" },
  SHIPPED: { label: "已发货", color: "bg-indigo-100 text-indigo-700" },
  DELIVERED: { label: "已完成", color: "bg-green-100 text-green-700" },
  CANCELLED: { label: "已取消", color: "bg-gray-100 text-gray-500" },
  REFUNDING: { label: "退款中", color: "bg-orange-100 text-orange-700" },
}

export default function AdminOrdersPage() {
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
              { href: "/admin/orders", label: "订单管理", icon: Package },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.href === '/admin/orders' ? 'bg-orange-50 text-orange-600' : 'hover:bg-orange-50 hover:text-orange-600'}`}>
                  <item.icon className="h-4 w-4" />{item.label}
                </button>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/admin"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
            <div><h1 className="text-2xl font-bold">订单管理</h1><p className="text-muted-foreground text-sm">共 {orders.length} 个订单</p></div>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索订单号..." className="pl-10" />
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">订单号</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">用户</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">金额</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">状态</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">支付方式</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">时间</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-mono text-sm">{order.id}</td>
                      <td className="p-4 text-sm">{order.user}</td>
                      <td className="p-4 text-sm font-medium">¥{order.amount}</td>
                      <td className="p-4"><Badge className={`${statusMap[order.status].color} border-0 text-xs`}>{statusMap[order.status].label}</Badge></td>
                      <td className="p-4 text-sm text-muted-foreground">{order.method}</td>
                      <td className="p-4 text-sm text-muted-foreground">{order.time}</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                          {order.status === "PAID" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500"><Truck className="h-4 w-4" /></Button>
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
