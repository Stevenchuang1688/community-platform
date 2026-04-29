import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized, apiNotFound } from "@/lib/api-response"

// PUT /api/shop/cart/[id] — 更新购物车项
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const cartItem = await prisma.cartItem.findUnique({ where: { id: params.id } })
    if (!cartItem) return apiNotFound("购物车项不存在")
    if (cartItem.userId !== payload.userId) return apiError("无权操作")

    const { quantity, selected } = await request.json()
    const updateData: any = {}
    if (quantity !== undefined) updateData.quantity = Math.max(1, quantity)
    if (selected !== undefined) updateData.selected = selected

    const updated = await prisma.cartItem.update({
      where: { id: params.id }, data: updateData,
      include: { product: { select: { id: true, title: true, price: true, images: true } } },
    })

    return apiSuccess({ cartItem: updated })
  } catch (error) {
    console.error("Update cart error:", error)
    return apiError("更新购物车失败", 500)
  }
}
