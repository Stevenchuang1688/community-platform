"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  Package,
  XCircle,
  ArrowLeft,
} from "lucide-react"

// 模拟订单数据
const orders = [
  {
    id: "CP202604280001",
    status: "PAID",
    items: [
      { title: "社群运营实战手册", price: 99, quantity: 1 },
      { title: "活动策划工具包", price: 49, quantity: 2 },
    ],
    totalAmount: 197,
    createdAt: "2026-04-28 10:30",
    payMethod: "微信支付",
  },
  {
    id: "CP202604250002",
    status: "DELIVERED",
    items: [
      { title: "小红书运营资料包", price: 39, quantity: 1 },
    ],
    totalAmount: 39,
    createdAt: "2026-04-25 15:20",
    payMethod: "支付宝",
  },
  {
    id: "CP202604200003",
    status: "CANCELLED",
    items: [
      { title: "1对1品牌咨询", price: 299, quantity: 1 },
    ],
    totalAmount: 299,
    createdAt: "2026-04-20 09:15",
    payMethod: "微信支付",
  },
]

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  PENDING: { label: "待付款", color: "bg-amber-100 text-amber-700", icon: Clock },
  PAID: { label: "已付款", color: "bg-blue-100 text-blue-700", icon: CheckCircle2 },
  SHIPPED: { label: "已发货", color: "bg-indigo-100 text-indigo-700", icon: Truck },
  DELIVERED: { label: "已完成", color: "bg-green-100 text-green-700", icon: Package },
  CANCELLED: { label: "已取消", color: "bg-gray-100 text-gray-500", icon: XCircle },
  REFUNDING: { label: "退款中", color: "bg-orange-100 text-orange-700", icon: Clock },
  REFUNDED: { label: "已退款", color: "bg-red-100 text-red-700", icon: XCircle },
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    if (activeTab === "pending") return order.status === "PENDING"
    if (activeTab === "paid") return order.status === "PAID"
    if (activeTab === "completed") return order.status === "DELIVERED"
    if (activeTab === "cancelled") return order.status === "CANCELLED"
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container px-4 md:px-6 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/shop">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">我的订单</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="pending">待付款</TabsTrigger>
            <TabsTrigger value="paid">已付款</TabsTrigger>
            <TabsTrigger value="completed">已完成</TabsTrigger>
            <TabsTrigger value="cancelled">已取消</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const config = statusConfig[order.status]
              const StatusIcon = config?.icon || Clock

              return (
                <Card key={order.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">订单号</span>
                        <span className="font-mono text-sm">{order.id}</span>
                      </div>
                      <Badge className={`${config?.color} border-0`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {config?.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-pink-100 rounded-lg flex items-center justify-center shrink-0">
                            <ShoppingBag className="h-6 w-6 text-pink-400" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                          </div>
                          <span className="text-sm font-medium">¥{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        <span>{order.createdAt}</span>
                        <span className="mx-2">·</span>
                        <span>{order.payMethod}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          共 {order.items.reduce((s, i) => s + i.quantity, 0)} 件
                        </span>
                        <span className="font-bold text-pink-600">¥{order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      {order.status === "PENDING" && (
                        <>
                          <Button variant="outline" size="sm">取消订单</Button>
                          <Button size="sm" className="bg-gradient-to-r from-pink-500 to-rose-500">立即支付</Button>
                        </>
                      )}
                      {order.status === "PAID" && (
                        <Button variant="outline" size="sm">申请退款</Button>
                      )}
                      {order.status === "DELIVERED" && (
                        <>
                          <Button variant="outline" size="sm">申请售后</Button>
                          <Button size="sm" className="bg-gradient-to-r from-pink-500 to-rose-500">再次购买</Button>
                        </>
                      )}
                      {order.status === "CANCELLED" && (
                        <Button variant="outline" size="sm">删除订单</Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold">暂无订单</h3>
            <p className="text-muted-foreground mt-1">去商城逛逛吧</p>
          </div>
        )}
      </div>
    </div>
  )
}
