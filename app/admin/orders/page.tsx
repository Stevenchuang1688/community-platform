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
  PENDING: { label: "待付款", color: "bg-[#C7D2FE]/60 text-[#5a6b66]" },
  PAID: { label: "已付款", color: "bg-[#6366F1]/10 text-[#6366F1]" },
  SHIPPED: { label: "已发货", color: "bg-[#6366F1]/15 text-[#6366F1]" },
  DELIVERED: { label: "已完成", color: "bg-[#6366F1]/20 text-[#6366F1]" },
  CANCELLED: { label: "已取消", color: "bg-[#C7D2FE]/40 text-[#8a9490]" },
  REFUNDING: { label: "退款中", color: "bg-red-50 text-red-600" },
}

export default function AdminOrdersPage() {
  return (
    <div className="min-h-screen bg-[#F0F0FF]">
      <div className="flex">
        <aside className="hidden md:flex w-64 bg-white border-r border-[#C7D2FE] flex-col h-screen sticky top-0">
          <div className="p-6 border-b border-[#C7D2FE]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#6366F1] rounded-lg flex items-center justify-center text-white text-sm font-medium">社</div>
              <div><p className="font-bold text-sm text-[#6366F1]">管理后台</p><p className="text-xs text-[#8a9490]">社群主理人平台</p></div>
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
                <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.href === '/admin/orders' ? 'bg-[#6366F1]/10 text-[#6366F1]' : 'text-[#5a6b66] hover:bg-[#6366F1]/5 hover:text-[#6366F1]'}`}>
                  <item.icon className="h-4 w-4" />{item.label}
                </button>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/admin"><Button variant="ghost" size="icon" className="text-[#6366F1] hover:bg-[#6366F1]/5"><ArrowLeft className="h-5 w-5" /></Button></Link>
            <div><h1 className="text-2xl font-bold text-[#6366F1]">订单管理</h1><p className="text-[#8a9490] text-sm">共 {orders.length} 个订单</p></div>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a9490]" />
              <Input placeholder="搜索订单号..." className="input-elegant pl-10 border-[#C7D2FE] focus:border-[#6366F1] focus:ring-[#6366F1]/20" />
            </div>
          </div>

          <Card className="card-elegant border-[#C7D2FE] shadow-sm">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#C7D2FE] bg-[#6366F1]/[0.03]">
                    <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">订单号</th>
                    <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">用户</th>
                    <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">金额</th>
                    <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">状态</th>
                    <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">支付方式</th>
                    <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">时间</th>
                    <th className="text-left p-4 text-sm font-medium text-[#5a6b66]">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-[#C7D2FE] hover:bg-[#F0F0FF]/70 transition-colors">
                      <td className="p-4 font-mono text-sm text-[#6366F1]">{order.id}</td>
                      <td className="p-4 text-sm text-[#3d5753]">{order.user}</td>
                      <td className="p-4 text-sm font-medium text-[#6366F1]">¥{order.amount}</td>
                      <td className="p-4"><Badge className={`${statusMap[order.status].color} tag-elegant border-0 text-xs`}>{statusMap[order.status].label}</Badge></td>
                      <td className="p-4 text-sm text-[#8a9490]">{order.method}</td>
                      <td className="p-4 text-sm text-[#8a9490]">{order.time}</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="btn-secondary h-8 w-8 text-[#6366F1] hover:bg-[#6366F1]/5"><Eye className="h-4 w-4" /></Button>
                          {order.status === "PAID" && (
                            <Button variant="ghost" size="icon" className="btn-secondary h-8 w-8 text-[#6366F1] hover:bg-[#6366F1]/5"><Truck className="h-4 w-4" /></Button>
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
