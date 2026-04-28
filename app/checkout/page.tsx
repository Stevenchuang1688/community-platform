"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Smartphone,
  Wallet,
  Shield,
  ArrowLeft,
  CheckCircle2,
  Lock,
  ShoppingBag,
} from "lucide-react"

// 支付方式
const paymentMethods = [
  { id: "wechat", name: "微信支付", icon: Smartphone, color: "text-[#6366F1]", bgColor: "bg-[#F0F0FF]" },
  { id: "alipay", name: "支付宝", icon: CreditCard, color: "text-[#6366F1]", bgColor: "bg-[#F0F0FF]" },
  { id: "balance", name: "余额支付", icon: Wallet, color: "text-[#6366F1]", bgColor: "bg-[#F0F0FF]" },
]

// 模拟订单数据
const orderItems = [
  { id: "1", title: "社群运营实战手册", price: 99, quantity: 1 },
  { id: "2", title: "活动策划工具包", price: 49, quantity: 2 },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("wechat")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"checkout" | "paying" | "success">("checkout")

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0)

  const handlePay = async () => {
    setLoading(true)
    setStep("paying")
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setStep("success")
    setLoading(false)
  }

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-elegant">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-[#F0F0FF] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-[#6366F1]" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-[#333]">支付成功！</h1>
          <p className="text-[#888] mb-6 text-sm">你的订单已支付成功，商品将很快交付</p>
          <div className="card-elegant p-6 mb-6 text-left">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">订单号</span>
                <span className="font-mono text-[#333]">CP202604280001</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">支付金额</span>
                <span className="font-bold text-[#6366F1]">¥{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#888]">支付方式</span>
                <span className="text-[#333]">{paymentMethods.find((m) => m.id === paymentMethod)?.name}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/orders" className="flex-1">
              <button className="btn-secondary w-full">查看订单</button>
            </Link>
            <Link href="/shop" className="flex-1">
              <button className="btn-primary w-full">继续购物</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (step === "paying") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-elegant">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-[#F0F0FF] rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="h-10 w-10 text-[#6366F1]" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-[#333]">支付处理中</h1>
          <p className="text-[#888] text-sm">请稍候，正在处理你的支付请求...</p>
          <div className="mt-6 flex justify-center">
            <div className="w-8 h-8 border-4 border-[#6366F1] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-elegant">
      <div className="container-elegant section-spacing">
        {/* 步骤指示器 */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-sm">1</div>
            <span className="font-medium text-sm text-[#333]">确认订单</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-[#888] flex items-center justify-center text-sm">2</div>
            <span className="text-sm text-[#888]">支付</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-[#888] flex items-center justify-center text-sm">3</div>
            <span className="text-sm text-[#888]">完成</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* 收货信息 */}
            <div className="card-elegant">
              <div className="p-5 pb-3">
                <h3 className="text-base font-semibold text-[#333]">收货信息</h3>
                <p className="text-sm text-[#888]">虚拟商品将发送至你的邮箱</p>
              </div>
              <div className="px-5 pb-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm text-[#333]">收件人</Label>
                    <Input id="name" placeholder="输入姓名" className="input-elegant" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm text-[#333]">手机号</Label>
                    <Input id="phone" placeholder="输入手机号" className="input-elegant" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-[#333]">接收邮箱</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="input-elegant" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remark" className="text-sm text-[#333]">订单备注</Label>
                  <Input id="remark" placeholder="选填" className="input-elegant" />
                </div>
              </div>
            </div>

            {/* 支付方式 */}
            <div className="card-elegant">
              <div className="p-5 pb-3">
                <h3 className="text-base font-semibold text-[#333]">支付方式</h3>
              </div>
              <div className="px-5 pb-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        paymentMethod === method.id
                          ? "border-[#6366F1] bg-[#F0F0FF]"
                          : "border-[#e5e5e5] hover:border-[#6366F1]/30"
                      }`}
                    >
                      <div className={`w-10 h-10 ${method.bgColor} rounded-lg flex items-center justify-center`}>
                        <method.icon className={`h-5 w-5 ${method.color}`} />
                      </div>
                      <span className="font-medium text-sm text-[#333]">{method.name}</span>
                      {paymentMethod === method.id && (
                        <CheckCircle2 className="h-5 w-5 text-[#6366F1] ml-auto" />
                      )}
                    </button>
                  ))}
                </div>

                {/* 模拟支付二维码 */}
                {paymentMethod === "wechat" && (
                  <div className="mt-8 text-center">
                    <div className="w-48 h-48 bg-[#F0F0FF] rounded-xl mx-auto flex items-center justify-center border-2 border-dashed border-[#6366F1]/20">
                      <div className="text-center">
                        <Smartphone className="h-12 w-12 text-[#6366F1]/30 mx-auto mb-2" />
                        <p className="text-sm text-[#6366F1]">微信扫码支付</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#888] mt-3">请使用微信扫描二维码完成支付</p>
                  </div>
                )}

                {paymentMethod === "alipay" && (
                  <div className="mt-8 text-center">
                    <div className="w-48 h-48 bg-[#F0F0FF] rounded-xl mx-auto flex items-center justify-center border-2 border-dashed border-[#6366F1]/20">
                      <div className="text-center">
                        <CreditCard className="h-12 w-12 text-[#6366F1]/30 mx-auto mb-2" />
                        <p className="text-sm text-[#6366F1]">支付宝扫码支付</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#888] mt-3">请使用支付宝扫描二维码完成支付</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 订单汇总 */}
          <div>
            <div className="card-elegant sticky top-20">
              <div className="p-5 pb-3">
                <h3 className="font-semibold text-base text-[#333]">订单详情</h3>
              </div>
              <div className="px-5 pb-5 space-y-4">
                {/* 商品列表 */}
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#F0F0FF] rounded-lg flex items-center justify-center shrink-0">
                        <ShoppingBag className="h-5 w-5 text-[#6366F1]/30" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1 text-[#333]">{item.title}</p>
                        <p className="text-xs text-[#888]">x{item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-[#333]">¥{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="divider-light" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888]">商品总额 ({totalItems}件)</span>
                    <span className="text-[#333]">¥{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888]">优惠</span>
                    <span className="text-green-600">-¥0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#888]">运费</span>
                    <span className="text-green-600">免运费</span>
                  </div>
                </div>

                <div className="divider-light" />

                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm text-[#333]">应付金额</span>
                  <span className="text-2xl font-bold text-[#6366F1]">¥{totalAmount.toFixed(2)}</span>
                </div>

                <button
                  className="btn-primary w-full h-12 text-base"
                  onClick={handlePay}
                  disabled={loading}
                >
                  <Shield className="mr-2 h-5 w-5" />
                  确认支付 ¥{totalAmount.toFixed(2)}
                </button>

                <p className="text-xs text-center text-[#888] flex items-center justify-center gap-1">
                  <Lock className="h-3 w-3" />
                  支付过程采用SSL加密，安全可靠
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
