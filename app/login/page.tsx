"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
    <div className="min-h-screen flex items-stretch bg-[#F0F0FF]">
      {/* 左侧品牌文案 */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center px-12 bg-[#6366F1]">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-10 border border-white/20 bg-white/10">
            社
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-wide">
            谦懋乐享
          </h2>
          <p className="text-xl text-white/80 mb-2">潮汕社群联盟</p>
          <div className="w-12 h-px bg-white/30 mx-auto my-8" />
          <p className="text-base text-white/60 leading-relaxed">
            以个体链接城市
          </p>
        </div>
      </div>

      {/* 右侧登录表单 */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* 移动端 Logo */}
          <div className="text-center mb-10 lg:hidden">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl mx-auto mb-4 bg-[#6366F1]">
              社
            </div>
            <h1 className="text-xl font-bold text-[#6366F1]">欢迎回来</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-8">
            <div className="mb-8 hidden lg:block">
              <h1 className="text-2xl font-bold text-[#6366F1]">欢迎回来</h1>
              <p className="text-sm text-[#888] mt-1">登录你的账号</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-medium text-[#333]">邮箱</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="input-elegant pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-[#333]">密码</label>
                  <Link href="/forgot-password" className="text-xs text-[#6366F1] hover:underline">
                    忘记密码？
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="输入密码"
                    className="input-elegant pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#333]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3"
                disabled={loading}
              >
                {loading ? "登录中..." : "登录"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </button>
            </form>

            <div className="divider-light my-6" />

            {/* 第三方登录 */}
            <div className="space-y-3">
              <p className="text-center text-xs text-[#888]">其他登录方式</p>
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-secondary w-full py-2.5 text-sm">
                  <svg className="h-4 w-4 mr-1.5" viewBox="0 0 24 24">
                    <path fill="#07C160" d="M8.69 13.6c-.32 0-.58-.26-.58-.58s.26-.58.58-.58.58.26.58.58-.26.58-.58.58zm-2.94 0c-.32 0-.58-.26-.58-.58s.26-.58.58-.58.58.26.58.58-.26.58-.58.58zm4.78 3.1c-.32 0-.58-.26-.58-.58s.26-.58.58-.58.58.26.58.58-.26.58-.58.58zm-2.94 0c-.32 0-.58-.26-.58-.58s.26-.58.58-.58.58.26.58.58-.26.58-.58.58zM12 2C6.48 2 2 5.81 2 10.5c0 2.66 1.46 5.04 3.75 6.63-.12.76-.67 2.73-2.86 4.87 2.48-.35 4.48-1.58 5.64-2.56.79.19 1.63.3 2.47.32V22h2v-2.27c.89-.04 1.75-.17 2.57-.38 1.16.98 3.16 2.21 5.64 2.56-2.19-2.14-2.74-4.11-2.86-4.87C20.54 15.54 22 13.16 22 10.5 22 5.81 17.52 2 12 2z"/>
                  </svg>
                  微信登录
                </button>
                <button className="btn-secondary w-full py-2.5 text-sm">
                  <svg className="h-4 w-4 mr-1.5" viewBox="0 0 24 24">
                    <path fill="#6366F1" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  手机登录
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-[#888] mt-6">
              还没有账号？{" "}
              <Link href="/register" className="text-[#6366F1] font-medium hover:underline">
                立即注册
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
