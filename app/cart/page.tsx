"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react"

// 模拟购物车数据
const initialCartItems = [
  {
    id: "1",
    product: { id: "1", title: "社群运营实战手册", price: 99, image: "", category: "课程" },
    quantity: 1,
    selected: true,
  },
  {
    id: "2",
    product: { id: "2", title: "活动策划工具包", price: 49, image: "", category: "工具" },
    quantity: 2,
    selected: true,
  },
  {
    id: "3",
    product: { id: "4", title: "主理人成长课", price: 199, image: "", category: "课程" },
    quantity: 1,
    selected: false,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const toggleSelect = (id: string) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    )
  }

  const toggleSelectAll = () => {
    const allSelected = cartItems.every((item) => item.selected)
    setCartItems((items) => items.map((item) => ({ ...item, selected: !allSelected })))
  }

  const selectedItems = cartItems.filter((item) => item.selected)
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0)
  const allSelected = cartItems.length > 0 && cartItems.every((item) => item.selected)

  return (
    <div className="min-h-screen bg-gradient-elegant">
      <div className="container-elegant section-spacing">
        {/* 头部 */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <Link href="/shop">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#333] flex items-center gap-2">
                <ShoppingCart className="h-6 w-6" />
                购物车
              </h1>
              <p className="text-[#888] text-sm mt-1">{cartItems.length} 件商品</p>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[#F5F1E9] rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-10 w-10 text-[#2C4A46]/20" />
            </div>
            <h3 className="text-lg font-semibold text-[#333]">购物车是空的</h3>
            <p className="text-[#888] mt-1 mb-6 text-sm">去商城逛逛，发现好物</p>
            <Link href="/shop">
              <button className="btn-primary">
                <ShoppingBag className="mr-2 h-4 w-4" />
                去逛逛
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* 购物车列表 */}
            <div className="lg:col-span-2 space-y-4">
              {/* 全选 */}
              <div className="card-elegant p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 accent-[#2C4A46]"
                  />
                  <span className="font-medium text-sm text-[#333]">全选</span>
                  <span className="text-sm text-[#888]">({selectedItems.length}/{cartItems.length})</span>
                </label>
              </div>

              {/* 商品列表 */}
              {cartItems.map((item) => (
                <div key={item.id} className={`card-elegant p-4 ${item.selected ? "border-l-2 border-l-[#2C4A46]" : ""}`}>
                  <div className="flex gap-4">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelect(item.id)}
                      className="h-4 w-4 mt-6 accent-[#2C4A46]"
                    />
                    <div className="w-20 h-20 bg-[#F5F1E9] rounded-xl flex items-center justify-center shrink-0">
                      {item.product.image ? (
                        <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <ShoppingBag className="h-8 w-8 text-[#2C4A46]/20" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="tag-elegant mb-1 inline-block text-[10px]">{item.product.category}</span>
                          <h3 className="font-medium text-sm text-[#333] line-clamp-1">{item.product.title}</h3>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-[#888] hover:text-red-500 transition-colors p-1">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-[#2C4A46]">¥{item.product.price}</span>
                        <div className="flex items-center border rounded-xl overflow-hidden border-[#e5e5e5]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#F5F1E9] transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-10 h-8 flex items-center justify-center border-x border-[#e5e5e5] text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-[#F5F1E9] transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 结算栏 */}
            <div className="lg:col-span-1">
              <div className="card-elegant sticky top-20">
                <div className="p-5 pb-3">
                  <h3 className="font-semibold text-base text-[#333]">订单摘要</h3>
                </div>
                <div className="px-5 pb-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#888]">已选商品</span>
                      <span className="text-[#333]">{totalItems} 件</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#888]">商品总额</span>
                      <span className="text-[#333]">¥{totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#888]">优惠</span>
                      <span className="text-green-600">-¥0.00</span>
                    </div>
                  </div>

                  <div className="divider-light" />

                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm text-[#333]">合计</span>
                    <span className="text-2xl font-bold text-[#2C4A46]">¥{totalAmount.toFixed(2)}</span>
                  </div>

                  <Link href="/checkout">
                    <button
                      className="btn-primary w-full h-12 text-base"
                      disabled={selectedItems.length === 0}
                    >
                      去结算
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </Link>

                  <Link href="/shop" className="block">
                    <button className="btn-secondary w-full">继续购物</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
