import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"

// GET /api/shop/products — 商品列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const categoryId = searchParams.get("categoryId") || undefined
    const search = searchParams.get("search") || undefined

    const where: any = { status: "ACTIVE" }
    if (categoryId) where.categoryId = categoryId
    if (search) where.title = { contains: search, mode: "insensitive" }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          seller: { select: { id: true, name: true, avatar: true } },
          category: { select: { id: true, name: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    return apiSuccess({ products, total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    console.error("List products error:", error)
    return apiError("获取商品列表失败", 500)
  }
}

// POST /api/shop/products — 创建商品
export async function POST(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()
    if (payload.role !== "ORGANIZER" && payload.role !== "ADMIN") {
      return apiError("仅主理人或管理员可发布商品", 403)
    }

    const { title, description, price, originalPrice, stock, categoryId, tags, images } = await request.json()
    if (!title || !description || !price || !stock || !categoryId) {
      return apiError("标题、描述、价格、库存和分类为必填")
    }

    const product = await prisma.product.create({
      data: {
        title, description, price, originalPrice: originalPrice || null,
        stock: parseInt(stock), categoryId,
        tags: tags || [], images: images || [],
        sellerId: payload.userId,
      },
      include: { seller: { select: { id: true, name: true, avatar: true } }, category: true },
    })

    return apiSuccess({ product }, 201)
  } catch (error) {
    console.error("Create product error:", error)
    return apiError("创建商品失败", 500)
  }
}
