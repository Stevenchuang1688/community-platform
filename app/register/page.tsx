"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Phone } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1) // 1: 基本信息, 2: 完善资料

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("两次密码不一致")
      return
    }

    if (password.length < 6) {
      setError("密码至少6位")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      })

      const data = await res.json()

      if (data.success) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        router.push("/")
        router.refresh()
      } else {
        setError(data.message || "注册失败")
      }
    } catch {
      setError("网络错误，请重试")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
            社
          </div>
          <h1 className="text-2xl font-bold">创建账号</h1>
          <p className="text-muted-foreground mt-1">加入社群主理人平台</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">注册新账号</CardTitle>
            <CardDescription>填写信息完成注册</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

              {/* 步骤指示器 */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
              </div>

              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">昵称</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="输入昵称"
                        className="pl-10"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">手机号</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="输入手机号"
                        className="pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    onClick={() => {
                      if (!name || !email) return
                      setStep(2)
                    }}
                  >
                    下一步
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password">密码</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="设置密码（至少6位）"
                        className="pl-10 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">确认密码</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="再次输入密码"
                        className="pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* 用户角色选择 */}
                  <div className="space-y-2">
                    <Label>角色选择</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                        <input type="radio" name="role" value="USER" defaultChecked className="accent-orange-500" />
                        <div>
                          <p className="font-medium text-sm">普通用户</p>
                          <p className="text-xs text-muted-foreground">参与活动学习</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-orange-50 hover:border-orange-300 transition-colors has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
                        <input type="radio" name="role" value="ORGANIZER" className="accent-orange-500" />
                        <div>
                          <p className="font-medium text-sm">主理人</p>
                          <p className="text-xs text-muted-foreground">发布活动服务</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setStep(1)}
                    >
                      上一步
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      disabled={loading}
                    >
                      {loading ? "注册中..." : "完成注册"}
                      {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </>
              )}

              <p className="text-xs text-muted-foreground text-center mt-4">
                注册即代表同意{" "}
                <Link href="/terms" className="text-orange-600 hover:underline">用户协议</Link>
                {" "}和{" "}
                <Link href="/privacy" className="text-orange-600 hover:underline">隐私政策</Link>
              </p>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              已有账号？{" "}
              <Link href="/login" className="text-orange-600 font-medium hover:underline">
                立即登录
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
