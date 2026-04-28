"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<"USER" | "ORGANIZER">("USER")

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
        body: JSON.stringify({ name, email, phone, password, role }),
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

      {/* 右侧注册表单 */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* 移动端 Logo */}
          <div className="text-center mb-10 lg:hidden">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl mx-auto mb-4 bg-[#6366F1]">
              社
            </div>
            <h1 className="text-xl font-bold text-[#6366F1]">创建账号</h1>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-8">
            <div className="mb-6 hidden lg:block">
              <h1 className="text-2xl font-bold text-[#6366F1]">创建账号</h1>
              <p className="text-sm text-[#888] mt-1">加入社群平台</p>
            </div>

            {/* 步骤指示器 - 圆点 */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className={`w-2.5 h-2.5 rounded-full transition-all ${step === 1 ? 'bg-[#6366F1] scale-110' : 'bg-[#6366F1]/20'}`} />
              <div className={`w-2.5 h-2.5 rounded-full transition-all ${step === 2 ? 'bg-[#6366F1] scale-110' : 'bg-[#6366F1]/20'}`} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl">
                  {error}
                </div>
              )}

              {step === 1 ? (
                <>
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-[#333]">昵称</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                      <input
                        id="name"
                        placeholder="输入昵称"
                        className="input-elegant pl-10"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

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
                    <label htmlFor="phone" className="text-sm font-medium text-[#333]">手机号</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="输入手机号"
                        className="input-elegant pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* 角色选择卡片 */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#333]">角色选择</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRole("USER")}
                        className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          role === "USER"
                            ? "bg-[#6366F1] border-[#6366F1] text-white"
                            : "bg-white border-[rgba(0,0,0,0.08)] text-[#333] hover:border-[#6366F1]/30"
                        }`}
                      >
                        <User className={`h-5 w-5 ${role === "USER" ? "text-white" : "text-[#888]"}`} />
                        <span className="text-sm font-medium">普通用户</span>
                        <span className={`text-xs ${role === "USER" ? "text-white/70" : "text-[#888]"}`}>
                          参与活动学习
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole("ORGANIZER")}
                        className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          role === "ORGANIZER"
                            ? "bg-[#6366F1] border-[#6366F1] text-white"
                            : "bg-white border-[rgba(0,0,0,0.08)] text-[#333] hover:border-[#6366F1]/30"
                        }`}
                      >
                        <svg className={`h-5 w-5 ${role === "ORGANIZER" ? "text-white" : "text-[#888]"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <span className="text-sm font-medium">主理人</span>
                        <span className={`text-xs ${role === "ORGANIZER" ? "text-white/70" : "text-[#888]"}`}>
                          发布活动服务
                        </span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-primary w-full py-3"
                    onClick={() => {
                      if (!name || !email) return
                      setStep(2)
                    }}
                  >
                    下一步
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label htmlFor="password" className="text-sm font-medium text-[#333]">密码</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="设置密码（至少6位）"
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

                  <div className="space-y-1.5">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-[#333]">确认密码</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                      <input
                        id="confirmPassword"
                        type="password"
                        placeholder="再次输入密码"
                        className="input-elegant pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="btn-secondary flex-1 py-3"
                      onClick={() => setStep(1)}
                    >
                      上一步
                    </button>
                    <button
                      type="submit"
                      className="btn-primary flex-1 py-3"
                      disabled={loading}
                    >
                      {loading ? "注册中..." : "完成注册"}
                      {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </button>
                  </div>
                </>
              )}

              <p className="text-xs text-[#888] text-center mt-4">
                注册即代表同意{" "}
                <Link href="/terms" className="text-[#6366F1] hover:underline">用户协议</Link>
                {" "}和{" "}
                <Link href="/privacy" className="text-[#6366F1] hover:underline">隐私政策</Link>
              </p>
            </form>

            <p className="text-center text-sm text-[#888] mt-6">
              已有账号？{" "}
              <Link href="/login" className="text-[#6366F1] font-medium hover:underline">
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
