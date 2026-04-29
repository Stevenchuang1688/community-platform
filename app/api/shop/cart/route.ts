import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized, apiNotFound } from "@/lib/api-response"

// GET /api/shop/cart — 获取购物车
export async function GET(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: payload.userId },
      include: {
        product: {
          select: { id: true, title: true, price: true, originalPrice: true, images: true, stock: true, status: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return apiSuccess({ cartItems })
  } catch (error) {
    console.error("Get cart error:", error)
    return apiError("获取购物车失败", 500)
  }
}

// POST /api/shop/cart — 添加到购物车
export async function POST(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const { productId, quantity } = await request.json()
    if (!productId) return apiError("商品ID为必填")

    // 检查商品
    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) return apiNotFound("商品不存在")
    if (product.status !== "ACTIVE") return apiError("商品已下架")

    // upsert：已存在则增加数量
    const cartItem = await prisma.cartItem.upsert({
      where: { userId_productId: { userId: payload.userId, productId } },
      update: { quantity: { increment: quantity || 1 } },
      create: { userId: payload.userId, productId, quantity: quantity || 1 },
      include: { product: { select: { id: true, title: true, price: true, images: true } } },
    })

    return apiSuccess({ cartItem })
  } catch (error) {
    console.error("Add to cart error:", error)
    return apiError("添加购物车失败", 500)
  }
}

// DELETE /api/shop/cart — 移除购物车商品
export async function DELETE(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const { cartItemId } = await request.json()
    if (!cartItemId) return apiError("购物车项ID为必填")

    const item = await prisma.cartItem.findUnique({ where: { id: cartItemId } })
    if (!item) return apiNotFound("购物车项不存在")
    if (item.userId !== payload.userId) return apiError("无权操作")

    await prisma.cartItem.delete({ where: { id: cartItemId } })
    return apiSuccess({ message: "已移除" })
  } catch (error) {
    console.error("Remove cart error:", error)
    return apiError("移除购物车失败", 500)
  }
}
