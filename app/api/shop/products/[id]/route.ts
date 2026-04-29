import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized, apiForbidden, apiNotFound } from "@/lib/api-response"

// GET /api/shop/products/[id] — 商品详情
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        seller: { select: { id: true, name: true, avatar: true, bio: true } },
        category: { select: { id: true, name: true } },
      },
    })

    if (!product) return apiNotFound("商品不存在")

    // 增加浏览量
    await prisma.product.update({ where: { id: params.id }, data: { viewCount: { increment: 1 } } })

    return apiSuccess({ product })
  } catch (error) {
    console.error("Get product error:", error)
    return apiError("获取商品详情失败", 500)
  }
}

// PUT /api/shop/products/[id] — 更新商品
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const product = await prisma.product.findUnique({ where: { id: params.id } })
    if (!product) return apiNotFound("商品不存在")
    if (product.sellerId !== payload.userId && payload.role !== "ADMIN") return apiForbidden()

    const body = await request.json()
    const updateData: any = {}
    for (const field of ["title", "description", "price", "originalPrice", "stock", "categoryId", "tags", "images", "status"]) {
      if (body[field] !== undefined) updateData[field] = body[field]
    }

    const updated = await prisma.product.update({
      where: { id: params.id }, data: updateData,
      include: { seller: { select: { id: true, name: true, avatar: true } }, category: true },
    })

    return apiSuccess({ product: updated })
  } catch (error) {
    console.error("Update product error:", error)
    return apiError("更新商品失败", 500)
  }
}

// DELETE /api/shop/products/[id] — 下架商品
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const product = await prisma.product.findUnique({ where: { id: params.id } })
    if (!product) return apiNotFound("商品不存在")
    if (product.sellerId !== payload.userId && payload.role !== "ADMIN") return apiForbidden()

    const updated = await prisma.product.update({
      where: { id: params.id }, data: { status: "INACTIVE" },
    })

    return apiSuccess({ product: updated })
  } catch (error) {
    console.error("Delete product error:", error)
    return apiError("下架商品失败", 500)
  }
}
