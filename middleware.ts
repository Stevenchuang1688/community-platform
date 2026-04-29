import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "community-platform-secret-key"

// 需要登录才能访问的路径
const protectedPaths = ["/profile", "/messages", "/cart", "/checkout", "/orders"]
// 需要管理员权限的路径
const adminPaths = ["/admin"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 跳过 API 路由、静态文件、登录注册页
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const isAdminPath = adminPaths.some((p) => pathname.startsWith(p))
  const isProtectedPath = protectedPaths.some((p) => pathname.startsWith(p))

  if (!isAdminPath && !isProtectedPath) {
    return NextResponse.next()
  }

  // 从 cookie 获取 token（middleware 无法读 localStorage）
  const token = request.cookies.get("token")?.value

  if (!token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; role: string }

    if (isAdminPath && payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
  } catch {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
