import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"

// POST /api/follow — 关注/取关
export async function POST(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const { userId } = await request.json()
    if (!userId) return apiError("用户ID为必填")
    if (userId === payload.userId) return apiError("不能关注自己")

    // 检查是否已关注
    const existing = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId: payload.userId, followingId: userId } },
    })

    if (existing) {
      // 取关
      await prisma.follow.delete({ where: { id: existing.id } })
      return apiSuccess({ followed: false })
    } else {
      // 关注
      await prisma.follow.create({
        data: { followerId: payload.userId, followingId: userId },
      })
      return apiSuccess({ followed: true })
    }
  } catch (error) {
    console.error("Follow error:", error)
    return apiError("操作失败", 500)
  }
}
