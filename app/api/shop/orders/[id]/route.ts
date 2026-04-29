import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized, apiForbidden, apiNotFound } from "@/lib/api-response"

// GET /api/shop/orders/[id] — 订单详情
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const order = await prisma.shopOrder.findUnique({
      where: { id: params.id },
      include: { items: { include: { product: { select: { id: true, title: true, images: true } } } } },
    })

    if (!order) return apiNotFound("订单不存在")
    if (order.userId !== payload.userId && payload.role !== "ADMIN") return apiForbidden()

    return apiSuccess({ order })
  } catch (error) {
    console.error("Get order error:", error)
    return apiError("获取订单失败", 500)
  }
}

// PUT /api/shop/orders/[id] — 更新订单状态
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const order = await prisma.shopOrder.findUnique({ where: { id: params.id } })
    if (!order) return apiNotFound("订单不存在")
    if (order.userId !== payload.userId && payload.role !== "ADMIN") return apiForbidden()

    const { status, transactionId } = await request.json()
    if (!status) return apiError("状态为必填")

    const updateData: any = { status }
    if (status === "PAID") {
      updateData.paidAt = new Date()
      updateData.transactionId = transactionId || null
    }

    const updated = await prisma.shopOrder.update({
      where: { id: params.id }, data: updateData,
      include: { items: true },
    })

    return apiSuccess({ order: updated })
  } catch (error) {
    console.error("Update order error:", error)
    return apiError("更新订单失败", 500)
  }
}
