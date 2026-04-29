import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiUnauthorized } from "@/lib/api-response"

export async function GET(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { profile: true },
    })

    if (!user) return apiUnauthorized("用户不存在")

    return apiSuccess({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
        phone: user.phone,
        profile: user.profile,
      },
    })
  } catch {
    return apiUnauthorized()
  }
}
