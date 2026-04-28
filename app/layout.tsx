import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layouts/navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "谦懋乐享潮汕社群联盟 - 以个体链接城市",
  description: "汇聚本地主理人，共建社群商业新生态。活动发布、技能互换、学习成长、OPC一人公司平台。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        
        {/* 页脚 */}
        <footer className="border-t border-gray-100 py-10 bg-white">
          <div className="container-elegant">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#6366F1' }}>
                  谦
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">谦懋乐享潮汕社群联盟</p>
                  <p className="text-xs text-gray-400">以个体链接城市</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>联系我们：contact@qmlx.club</span>
                <span className="hidden md:inline">|</span>
                <span>微信：qmlx2024</span>
              </div>
              <p className="text-xs text-gray-400">© 2026 谦懋乐享. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
