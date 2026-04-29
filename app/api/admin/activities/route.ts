import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"

// GET /api/admin/activities — 所有活动（含草稿）
export async function GET(request: Request) {
  try {
    requireAdmin(request)

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || undefined
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")

    const where: any = {}
    if (status) where.status = status

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        include: {
          organizer: { select: { id: true, name: true, avatar: true } },
          _count: { select: { registrations: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.activity.count({ where }),
    ])

    return apiSuccess({ activities, total, page })
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden: Admin only")) {
      return apiUnauthorized()
    }
    console.error("Admin activities error:", error)
    return apiError("获取活动列表失败", 500)
  }
}

// PUT /api/admin/activities — 审核活动
export async function PUT(request: Request) {
  try {
    requireAdmin(request)

    const { activityId, status } = await request.json()
    if (!activityId || !status) return apiError("活动ID和状态为必填")

    const activity = await prisma.activity.update({
      where: { id: activityId }, data: { status },
      include: { organizer: { select: { name: true } } },
    })

    return apiSuccess({ activity })
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden: Admin only")) {
      return apiUnauthorized()
    }
    console.error("Admin update activity error:", error)
    return apiError("审核活动失败", 500)
  }
}
