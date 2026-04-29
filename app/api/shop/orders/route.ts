import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"

// GET /api/shop/orders — 我的订单列表
export async function GET(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || undefined

    const where: any = { userId: payload.userId }
    if (status) where.status = status

    const orders = await prisma.shopOrder.findMany({
      where,
      include: {
        items: { include: { product: { select: { id: true, title: true, images: true } } } },
      },
      orderBy: { createdAt: "desc" },
    })

    return apiSuccess({ orders })
  } catch (error) {
    console.error("List orders error:", error)
    return apiError("获取订单列表失败", 500)
  }
}

// POST /api/shop/orders — 创建订单
export async function POST(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const { cartItemIds, receiverName, receiverPhone, receiverAddress, payMethod, remark } = await request.json()
    if (!cartItemIds?.length) return apiError("请选择要结算的商品")

    // 获取购物车项
    const cartItems = await prisma.cartItem.findMany({
      where: { id: { in: cartItemIds }, userId: payload.userId },
      include: { product: true },
    })

    if (!cartItems.length) return apiError("购物车为空")

    // 计算总金额
    let totalAmount = 0
    const orderItemsData = cartItems.map((item) => {
      const amount = item.product.price * item.quantity
      totalAmount += amount
      return {
        productId: item.productId,
        title: item.product.title,
        image: item.product.images[0] || null,
        price: item.product.price,
        quantity: item.quantity,
        amount,
      }
    })

    // 生成订单号
    const orderNo = "CP" + Date.now() + Math.random().toString(36).substring(2, 6).toUpperCase()

    const order = await prisma.shopOrder.create({
      data: {
        orderNo,
        userId: payload.userId,
        totalAmount,
        payAmount: totalAmount,
        receiverName: receiverName || null,
        receiverPhone: receiverPhone || null,
        receiverAddress: receiverAddress || null,
        payMethod: payMethod || null,
        remark: remark || null,
        status: "PENDING",
        items: { create: orderItemsData },
      },
      include: { items: true },
    })

    // 清除已结算的购物车项
    await prisma.cartItem.deleteMany({
      where: { id: { in: cartItemIds }, userId: payload.userId },
    })

    return apiSuccess({ order }, 201)
  } catch (error) {
    console.error("Create order error:", error)
    return apiError("创建订单失败", 500)
  }
}
