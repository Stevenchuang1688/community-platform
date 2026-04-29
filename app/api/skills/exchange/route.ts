import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"

// GET /api/skills/exchange — 我的技能交换请求
export async function GET(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || undefined

    const where: any = {
      OR: [{ requesterId: payload.userId }, { providerId: payload.userId }],
    }
    if (status) where.status = status

    const exchanges = await prisma.skillExchange.findMany({
      where,
      include: {
        requester: { select: { id: true, name: true, avatar: true } },
        provider: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    return apiSuccess({ exchanges })
  } catch (error) {
    console.error("List exchanges error:", error)
    return apiError("获取交换请求失败", 500)
  }
}

// POST /api/skills/exchange — 发起技能交换
export async function POST(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const { providerId, skillId, message } = await request.json()
    if (!providerId || !skillId) return apiError("提供者ID和技能ID为必填")
    if (providerId === payload.userId) return apiError("不能向自己发起交换")

    const exchange = await prisma.skillExchange.create({
      data: {
        requesterId: payload.userId,
        providerId,
        skillId,
        message: message || null,
        status: "PENDING",
      },
      include: {
        requester: { select: { id: true, name: true, avatar: true } },
        provider: { select: { id: true, name: true, avatar: true } },
      },
    })

    return apiSuccess({ exchange }, 201)
  } catch (error) {
    console.error("Create exchange error:", error)
    return apiError("发起交换失败", 500)
  }
}
