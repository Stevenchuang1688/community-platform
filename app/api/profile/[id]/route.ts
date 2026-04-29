import { prisma } from "@/lib/prisma"
import { apiSuccess, apiError, apiNotFound } from "@/lib/api-response"

// GET /api/profile/[id] — 查看他人公开资料
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        profile: true,
        _count: { select: { follows: true, followers: true, activities: true, posts: true } },
      },
    })

    if (!user) return apiNotFound("用户不存在")

    return apiSuccess({
      user: {
        id: user.id, name: user.name, avatar: user.avatar, bio: user.bio, role: user.role,
        profile: user.profile,
        stats: user._count,
      },
    })
  } catch (error) {
    console.error("Get public profile error:", error)
    return apiError("获取用户资料失败", 500)
  }
}
