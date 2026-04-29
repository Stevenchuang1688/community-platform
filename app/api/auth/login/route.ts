import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { signToken, COOKIE_OPTIONS } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "邮箱和密码不能为空" }, { status: 400 })
    }

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    })

    if (!user) {
      return NextResponse.json({ success: false, message: "邮箱或密码错误" }, { status: 401 })
    }

    // 修复：OAuth 用户无密码，禁止通过密码登录
    if (!user.password) {
      return NextResponse.json(
        { success: false, message: "该账号使用第三方登录，请使用对应方式登录" },
        { status: 401 }
      )
    }

    // 验证密码
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ success: false, message: "邮箱或密码错误" }, { status: 401 })
    }

    // 检查账号状态
    if (user.status === "SUSPENDED") {
      return NextResponse.json({ success: false, message: "账号已被封禁" }, { status: 403 })
    }

    // 生成 JWT
    const token = signToken({ userId: user.id, email: user.email, role: user.role })

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    })

    // 设置 httpOnly cookie（供 middleware 路由保护使用）
    response.cookies.set("token", token, COOKIE_OPTIONS)

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "服务器错误" }, { status: 500 })
  }
}
