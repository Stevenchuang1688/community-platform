import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layouts/navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "社群主理人平台 - 连接主理人，发现精彩活动",
  description: "发布活动、展示自我、学习成长、交友互动、技能互换、OPC平台 - 一站式社群运营解决方案",
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
        <footer className="border-t py-8 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded flex items-center justify-center text-white text-xs">
                  社
                </div>
                <span className="font-semibold">社群主理人平台</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2026 社群主理人平台. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
