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
  { id: "wechat", name: "微信支付", icon: Smartphone, color: "text-green-500", bgColor: "bg-green-50" },
  { id: "alipay", name: "支付宝", icon: CreditCard, color: "text-blue-500", bgColor: "bg-blue-50" },
  { id: "balance", name: "余额支付", icon: Wallet, color: "text-orange-500", bgColor: "bg-orange-50" },
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

    // 模拟支付过程
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    setStep("success")
    setLoading(false)
  }

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">支付成功！</h1>
          <p className="text-muted-foreground mb-6">你的订单已支付成功，商品将很快交付</p>
          <div className="bg-white rounded-xl p-6 border mb-6 text-left">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">订单号</span>
                <span className="font-mono">CP202604280001</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">支付金额</span>
                <span className="font-bold text-pink-600">¥{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">支付方式</span>
                <span>{paymentMethods.find((m) => m.id === paymentMethod)?.name}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/orders" className="flex-1">
              <Button variant="outline" className="w-full">查看订单</Button>
            </Link>
            <Link href="/shop" className="flex-1">
              <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500">继续购物</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (step === "paying") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Lock className="h-10 w-10 text-pink-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">支付处理中</h1>
          <p className="text-muted-foreground">请稍候，正在处理你的支付请求...</p>
          <div className="mt-6 flex justify-center">
            <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container px-4 md:px-6 py-8">
        {/* 步骤指示器 */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm">1</div>
            <span className="font-medium text-sm">确认订单</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm">2</div>
            <span className="text-sm text-muted-foreground">支付</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-200"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm">3</div>
            <span className="text-sm text-muted-foreground">完成</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* 收货信息 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">收货信息</CardTitle>
                <CardDescription>虚拟商品将发送至你的邮箱</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">收件人</Label>
                    <Input id="name" placeholder="输入姓名" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">手机号</Label>
                    <Input id="phone" placeholder="输入手机号" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">接收邮箱</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remark">订单备注</Label>
                  <Input id="remark" placeholder="选填" />
                </div>
              </CardContent>
            </Card>

            {/* 支付方式 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">支付方式</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        paymentMethod === method.id
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className={`w-10 h-10 ${method.bgColor} rounded-lg flex items-center justify-center`}>
                        <method.icon className={`h-5 w-5 ${method.color}`} />
                      </div>
                      <span className="font-medium text-sm">{method.name}</span>
                      {paymentMethod === method.id && (
                        <CheckCircle2 className="h-5 w-5 text-pink-500 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>

                {/* 模拟支付二维码 */}
                {paymentMethod === "wechat" && (
                  <div className="mt-6 text-center">
                    <div className="w-48 h-48 bg-green-50 rounded-xl mx-auto flex items-center justify-center border-2 border-dashed border-green-200">
                      <div className="text-center">
                        <Smartphone className="h-12 w-12 text-green-400 mx-auto mb-2" />
                        <p className="text-sm text-green-600">微信扫码支付</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">请使用微信扫描二维码完成支付</p>
                  </div>
                )}

                {paymentMethod === "alipay" && (
                  <div className="mt-6 text-center">
                    <div className="w-48 h-48 bg-blue-50 rounded-xl mx-auto flex items-center justify-center border-2 border-dashed border-blue-200">
                      <div className="text-center">
                        <CreditCard className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                        <p className="text-sm text-blue-600">支付宝扫码支付</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">请使用支付宝扫描二维码完成支付</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 订单汇总 */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>订单详情</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 商品列表 */}
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center shrink-0">
                        <ShoppingBag className="h-5 w-5 text-pink-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                        <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium">¥{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">商品总额 ({totalItems}件)</span>
                    <span>¥{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">优惠</span>
                    <span className="text-green-500">-¥0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">运费</span>
                    <span className="text-green-500">免运费</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-medium">应付金额</span>
                  <span className="text-2xl font-bold text-pink-600">¥{totalAmount.toFixed(2)}</span>
                </div>

                <Button
                  className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                  onClick={handlePay}
                  disabled={loading}
                >
                  <Shield className="mr-2 h-5 w-5" />
                  确认支付 ¥{totalAmount.toFixed(2)}
                </Button>

                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                  <Lock className="h-3 w-3" />
                  支付过程采用SSL加密，安全可靠
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
