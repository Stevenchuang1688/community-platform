import { prisma } from "@/lib/prisma"
import { apiSuccess, apiError } from "@/lib/api-response"

// GET /api/shop/categories — 商品分类列表
export async function GET() {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: { sort: "asc" },
      include: { _count: { select: { products: { where: { status: "ACTIVE" } } } } },
    })

    return apiSuccess({ categories })
  } catch (error) {
    console.error("List categories error:", error)
    return apiError("获取分类列表失败", 500)
  }
}
