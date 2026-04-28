import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "community-platform-secret-key"

export async function POST(request: Request) {
  try {
    const { name, email, phone, password, role } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "必填信息不能为空" }, { status: 400 })
    }

    // 检查邮箱是否已注册
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ success: false, message: "邮箱已被注册" }, { status: 400 })
    }

    // 检查手机号是否已注册
    if (phone) {
      const existingPhone = await prisma.user.findUnique({ where: { phone } })
      if (existingPhone) {
        return NextResponse.json({ success: false, message: "手机号已被注册" }, { status: 400 })
      }
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建用户
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: role === "ORGANIZER" ? "ORGANIZER" : "USER",
        profile: {
          create: {},
        },
      },
    })

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
    console.error("Register error:", error)
    return NextResponse.json({ success: false, message: "注册失败，请重试" }, { status: 500 })
  }
}
