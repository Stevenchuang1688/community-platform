import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"

// GET /api/admin/stats — 管理后台统计数据
export async function GET(request: Request) {
  try {
    const payload = requireAdmin(request)

    const [
      totalUsers,
      totalActivities,
      totalProducts,
      totalOrders,
      orderStats,
      recentUsers,
      recentActivities,
      recentOrders,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.activity.count({ where: { status: "PUBLISHED" } }),
      prisma.product.count({ where: { status: "ACTIVE" } }),
      prisma.shopOrder.count(),
      prisma.shopOrder.aggregate({ _sum: { payAmount: true }, where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] } } }),
      prisma.user.findMany({ take: 5, orderBy: { createdAt: "desc" }, select: { id: true, name: true, avatar: true, email: true, role: true, createdAt: true } }),
      prisma.activity.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { organizer: { select: { name: true } } } }),
      prisma.shopOrder.findMany({ take: 5, orderBy: { createdAt: "desc" }, include: { items: { select: { title: true } } } }),
    ])

    return apiSuccess({
      stats: {
        totalUsers,
        totalActivities,
        totalProducts,
        totalOrders,
        totalRevenue: orderStats._sum.payAmount || 0,
      },
      recentUsers,
      recentActivities,
      recentOrders,
    })
  } catch (error) {
    if (error instanceof Error && (error.message === "Unauthorized" || error.message === "Forbidden: Admin only")) {
      return apiUnauthorized()
    }
    console.error("Admin stats error:", error)
    return apiError("获取统计数据失败", 500)
  }
}
