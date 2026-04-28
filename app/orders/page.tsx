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
  PENDING: { label: "待付款", color: "bg-[#F0F0FF] text-[#6366F1]", icon: Clock },
  PAID: { label: "已付款", color: "bg-[#F0F0FF] text-[#6366F1]", icon: CheckCircle2 },
  SHIPPED: { label: "已发货", color: "bg-[#F0F0FF] text-[#6366F1]", icon: Truck },
  DELIVERED: { label: "已完成", color: "bg-[#6366F1] text-white", icon: Package },
  CANCELLED: { label: "已取消", color: "bg-gray-100 text-[#888]", icon: XCircle },
  REFUNDING: { label: "退款中", color: "bg-[#F0F0FF] text-[#6366F1]", icon: Clock },
  REFUNDED: { label: "已退款", color: "bg-gray-100 text-[#888]", icon: XCircle },
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
    <div className="min-h-screen bg-gradient-elegant">
      <div className="container-elegant section-spacing">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/shop">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-[#333]">我的订单</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
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
                <div key={order.id} className="card-elegant">
                  <div className="p-5 pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#888]">订单号</span>
                        <span className="font-mono text-sm text-[#333]">{order.id}</span>
                      </div>
                      <span className={`${config?.color} text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {config?.label}
                      </span>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-[#F0F0FF] rounded-xl flex items-center justify-center shrink-0">
                            <ShoppingBag className="h-6 w-6 text-[#6366F1]/20" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm text-[#333]">{item.title}</p>
                            <p className="text-xs text-[#888]">x{item.quantity}</p>
                          </div>
                          <span className="text-sm font-medium text-[#333]">¥{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="divider-light mt-4" />

                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-[#888]">
                        <span>{order.createdAt}</span>
                        <span className="mx-2">·</span>
                        <span>{order.payMethod}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-[#888]">
                          共 {order.items.reduce((s, i) => s + i.quantity, 0)} 件
                        </span>
                        <span className="font-bold text-[#6366F1]">¥{order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      {order.status === "PENDING" && (
                        <>
                          <button className="btn-secondary text-xs !px-3 !py-1.5">取消订单</button>
                          <button className="btn-primary text-xs !px-3 !py-1.5">立即支付</button>
                        </>
                      )}
                      {order.status === "PAID" && (
                        <button className="btn-secondary text-xs !px-3 !py-1.5">申请退款</button>
                      )}
                      {order.status === "DELIVERED" && (
                        <>
                          <button className="btn-secondary text-xs !px-3 !py-1.5">申请售后</button>
                          <button className="btn-primary text-xs !px-3 !py-1.5">再次购买</button>
                        </>
                      )}
                      {order.status === "CANCELLED" && (
                        <button className="btn-secondary text-xs !px-3 !py-1.5">删除订单</button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-[#F0F0FF] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-[#6366F1]/20" />
            </div>
            <h3 className="text-lg font-semibold text-[#333]">暂无订单</h3>
            <p className="text-[#888] mt-1 text-sm">去商城逛逛吧</p>
          </div>
        )}
      </div>
    </div>
  )
}
