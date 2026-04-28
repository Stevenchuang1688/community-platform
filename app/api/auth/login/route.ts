import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "community-platform-secret-key"

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

    // 验证密码
    if (user.password) {
      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) {
        return NextResponse.json({ success: false, message: "邮箱或密码错误" }, { status: 401 })
      }
    }

    // 生成 JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    return NextResponse.json({
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
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "服务器错误" }, { status: 500 })
  }
}
