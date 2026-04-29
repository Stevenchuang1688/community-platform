import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F0FF]">
      <div className="max-w-sm w-full px-6">
        <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-8 text-center">
          <div className="w-16 h-16 bg-[#F0F0FF] rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-[#6366F1]" />
          </div>
          <h1 className="text-xl font-bold text-[#333] mb-3">忘记密码</h1>
          <p className="text-sm text-[#888] mb-6 leading-relaxed">
            如需重置密码，请联系管理员：
          </p>
          <div className="bg-[#F0F0FF] rounded-xl p-4 mb-6">
            <p className="text-sm text-[#6366F1] font-medium">微信：qmlx2024</p>
            <p className="text-sm text-[#888] mt-1">邮箱：contact@qmlx.club</p>
          </div>
          <Link href="/login">
            <Button className="btn-primary w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回登录
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
