import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"

// GET /api/admin/users — 用户列表
export async function GET(request: Request) {
  try {
    requireAdmin(request)

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || undefined
    const role = searchParams.get("role") || undefined
    const status = searchParams.get("status") || undefined
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")

    const where: any = {}
    if (search) where.name = { contains: search, mode: "insensitive" }
    if (role) where.role = role
    if (status) where.status = status

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: { id: true, name: true, email: true, avatar: true, role: true, status: true, createdAt: true,
          _count: { select: { activities: true, posts: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.user.count({ where }),
    ])

    return apiSuccess({ users, total, page })
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden: Admin only")) {
      return apiUnauthorized()
    }
    console.error("Admin users error:", error)
    return apiError("获取用户列表失败", 500)
  }
}

// PUT /api/admin/users — 更新用户状态
export async function PUT(request: Request) {
  try {
    requireAdmin(request)

    const { userId, status, role } = await request.json()
    if (!userId) return apiError("用户ID为必填")

    const updateData: any = {}
    if (status) updateData.status = status
    if (role) updateData.role = role

    const user = await prisma.user.update({
      where: { id: userId }, data: updateData,
      select: { id: true, name: true, role: true, status: true },
    })

    return apiSuccess({ user })
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden: Admin only")) {
      return apiUnauthorized()
    }
    console.error("Admin update user error:", error)
    return apiError("更新用户失败", 500)
  }
}
