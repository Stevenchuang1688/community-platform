"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.success) {
        // 保存 token
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        router.push("/")
        router.refresh()
      } else {
        setError(data.message || "登录失败")
      }
    } catch {
      setError("网络错误，请重试")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
            社
          </div>
          <h1 className="text-2xl font-bold">欢迎回来</h1>
          <p className="text-muted-foreground mt-1">登录你的社群主理人账号</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">账号登录</CardTitle>
            <CardDescription>输入邮箱和密码登录</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">密码</Label>
                  <Link href="/forgot-password" className="text-xs text-orange-600 hover:underline">
                    忘记密码？
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="输入密码"
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

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                disabled={loading}
              >
                {loading ? "登录中..." : "登录"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <Separator className="my-6" />

            {/* 第三方登录 */}
            <div className="space-y-3">
              <p className="text-center text-sm text-muted-foreground">其他登录方式</p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#07C160" d="M8.69 13.6c-.32 0-.58-.26-.58-.58s.26-.58.58-.58.58.26.58.58-.26.58-.58.58zm-2.94 0c-.32 0-.58-.26-.58-.58s.26-.58.58-.58.58.26.58.58-.26.58-.58.58zm4.78 3.1c-.32 0-.58-.26-.58-.58s.26-.58.58-.58.58.26.58.58-.26.58-.58.58zm-2.94 0c-.32 0-.58-.26-.58-.58s.26-.58.58-.58.58.26.58.58-.26.58-.58.58zM12 2C6.48 2 2 5.81 2 10.5c0 2.66 1.46 5.04 3.75 6.63-.12.76-.67 2.73-2.86 4.87 2.48-.35 4.48-1.58 5.64-2.56.79.19 1.63.3 2.47.32V22h2v-2.27c.89-.04 1.75-.17 2.57-.38 1.16.98 3.16 2.21 5.64 2.56-2.19-2.14-2.74-4.11-2.86-4.87C20.54 15.54 22 13.16 22 10.5 22 5.81 17.52 2 12 2z"/>
                  </svg>
                  微信登录
                </Button>
                <Button variant="outline" className="w-full">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#1677FF" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  手机登录
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              还没有账号？{" "}
              <Link href="/register" className="text-orange-600 font-medium hover:underline">
                立即注册
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
