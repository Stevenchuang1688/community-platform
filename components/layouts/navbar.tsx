"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Calendar,
  Lightbulb,
  BookOpen,
  Briefcase,
  MessageCircle,
  LogOut,
  ShoppingBag,
  ShoppingCart,
  Package,
  Settings,
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
  const [cartCount, setCartCount] = useState(3)

  useEffect(() => {
    // 从 localStorage 获取用户信息
    const stored = localStorage.getItem("user")
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {}
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/"
  }

  const navItems = [
    { href: "/activities", label: "活动", icon: Calendar },
    { href: "/skills", label: "技能互换", icon: Lightbulb },
    { href: "/learn", label: "学习", icon: BookOpen },
    { href: "/shop", label: "商城", icon: ShoppingBag },
    { href: "/opc", label: "OPC", icon: Briefcase },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white text-sm">
            社
          </div>
          <span className="hidden sm:inline">社群主理人</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* 购物车 */}
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* 消息 */}
              <Link href="/messages">
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </Link>

              {/* 用户菜单 */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-orange-100 text-orange-700">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="px-2 py-1.5 border-b mb-1">
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {user.role === "ORGANIZER" ? "主理人" : "用户"}
                    </Badge>
                  </div>
                  <Link href="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      个人中心
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/orders">
                    <DropdownMenuItem>
                      <Package className="mr-2 h-4 w-4" />
                      我的订单
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/profile/activities">
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      我的活动
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/profile/settings">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      设置
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost">登录</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  注册
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                {user && (
                  <>
                    <div className="border-t pt-4 mt-2">
                      <Link href="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors">
                        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">购物车</span>
                        {cartCount > 0 && <Badge className="ml-auto">{cartCount}</Badge>}
                      </Link>
                      <Link href="/orders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors">
                        <Package className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">我的订单</span>
                      </Link>
                    </div>
                  </>
                )}
                {!user && (
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full" variant="outline">登录</Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500">注册</Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
