"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  User,
  LogOut,
  MessageCircle,
  ShoppingCart,
  Package,
  Settings,
  Sparkles,
} from "lucide-react"

interface UserInfo {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<UserInfo | null>(null)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem("user")
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {}
    }
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch {}
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/"
  }

  const navItems = [
    { href: "/", label: "首页" },
    { href: "/activities", label: "活动" },
    { href: "/skills", label: "技能互换" },
    { href: "/learn", label: "学习" },
    { href: "/opc", label: "OPC" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-lg">
      <div className="container-elegant">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm group-hover:shadow-md transition-shadow" style={{ backgroundColor: '#6366F1' }}>
              谦
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold text-gray-900 group-hover:text-[#6366F1] transition-colors">谦懋乐享潮汕社群联盟</span>
              <span className="text-xs text-gray-400">以个体链接城市</span>
            </div>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium text-gray-600 hover:text-[#6366F1] transition-colors py-5 group"
              >
                {item.label}
                <span className="absolute bottom-4 left-0 w-0 h-0.5 bg-[#6366F1] transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          {/* 右侧操作区 */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link href="/cart" className="relative p-2 text-gray-500 hover:text-[#6366F1] transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 text-white text-[10px] rounded-full flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link href="/messages" className="p-2 text-gray-500 hover:text-[#6366F1] transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger className="ml-2">
                    <Avatar className="h-8 w-8 border-2 border-[#6366F1]/20">
                      <AvatarFallback className="bg-[#F0F0FF] text-[#6366F1] text-sm font-medium">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52" align="end">
                    <div className="px-3 py-2 border-b border-gray-100 mb-1">
                      <p className="font-medium text-sm text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <span className="inline-flex mt-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-medium bg-[#F0F0FF] text-[#6366F1]">
                        {user.role === "ORGANIZER" ? "✨ 主理人" : "用户"}
                      </span>
                    </div>
                    <Link href="/profile"><DropdownMenuItem className="text-sm"><User className="mr-2 h-4 w-4" />个人中心</DropdownMenuItem></Link>
                    <Link href="/orders"><DropdownMenuItem className="text-sm"><Package className="mr-2 h-4 w-4" />我的订单</DropdownMenuItem></Link>
                    <Link href="/profile/settings"><DropdownMenuItem className="text-sm"><Settings className="mr-2 h-4 w-4" />设置</DropdownMenuItem></Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 text-sm"><LogOut className="mr-2 h-4 w-4" />退出登录</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-sm text-gray-600 hover:text-[#6366F1]">登录</Button>
                </Link>
                <Link href="/register">
                  <Button className="btn-primary text-sm">
                    <Sparkles className="h-4 w-4" />
                    免费注册
                  </Button>
                </Link>
              </div>
            )}

            {/* 移动端菜单 */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden ml-2">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white">
                <div className="flex flex-col gap-1 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#F0F0FF] hover:text-[#6366F1] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {!user && (
                    <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full rounded-xl">登录</Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full btn-primary">免费注册</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
