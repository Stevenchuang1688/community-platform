import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"

// POST /api/like — 点赞/取消
export async function POST(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const { postId } = await request.json()
    if (!postId) return apiError("帖子ID为必填")

    const existing = await prisma.like.findUnique({
      where: { userId_postId: { userId: payload.userId, postId } },
    })

    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } })
      await prisma.post.update({ where: { id: postId }, data: { likeCount: { decrement: 1 } } })
      return apiSuccess({ liked: false })
    } else {
      await prisma.like.create({ data: { userId: payload.userId, postId } })
      await prisma.post.update({ where: { id: postId }, data: { likeCount: { increment: 1 } } })
      return apiSuccess({ liked: true })
    }
  } catch (error) {
    console.error("Like error:", error)
    return apiError("操作失败", 500)
  }
}
