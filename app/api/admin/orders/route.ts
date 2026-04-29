import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"

// GET /api/admin/orders — 所有订单
export async function GET(request: Request) {
  try {
    requireAdmin(request)

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || undefined
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")

    const where: any = {}
    if (status) where.status = status

    const [orders, total] = await Promise.all([
      prisma.shopOrder.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, avatar: true } },
          items: { select: { title: true, quantity: true, amount: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.shopOrder.count({ where }),
    ])

    return apiSuccess({ orders, total, page })
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden: Admin only")) {
      return apiUnauthorized()
    }
    console.error("Admin orders error:", error)
    return apiError("获取订单列表失败", 500)
  }
}

// PUT /api/admin/orders — 更新订单状态
export async function PUT(request: Request) {
  try {
    requireAdmin(request)

    const { orderId, status } = await request.json()
    if (!orderId || !status) return apiError("订单ID和状态为必填")

    const order = await prisma.shopOrder.update({
      where: { id: orderId }, data: { status },
    })

    return apiSuccess({ order })
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden: Admin only")) {
      return apiUnauthorized()
    }
    console.error("Admin update order error:", error)
    return apiError("更新订单失败", 500)
  }
}
