import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"

// GET /api/profile — 获取我的资料
export async function GET(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { profile: true },
    })

    if (!user) return apiError("用户不存在", 404)

    return apiSuccess({
      user: {
        id: user.id, name: user.name, email: user.email, avatar: user.avatar,
        bio: user.bio, role: user.role, phone: user.phone, profile: user.profile,
      },
    })
  } catch (error) {
    console.error("Get profile error:", error)
    return apiError("获取资料失败", 500)
  }
}

// PUT /api/profile — 更新我的资料
export async function PUT(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const body = await request.json()

    // 更新 User 表字段
    const userUpdate: any = {}
    if (body.name) userUpdate.name = body.name
    if (body.bio !== undefined) userUpdate.bio = body.bio
    if (body.avatar !== undefined) userUpdate.avatar = body.avatar

    if (Object.keys(userUpdate).length > 0) {
      await prisma.user.update({ where: { id: payload.userId }, data: userUpdate })
    }

    // 更新 Profile 表字段
    const profileUpdate: any = {}
    for (const field of ["location", "occupation", "company", "website", "wechat", "weibo", "github", "interests"]) {
      if (body[field] !== undefined) profileUpdate[field] = body[field]
    }

    if (Object.keys(profileUpdate).length > 0) {
      await prisma.profile.upsert({
        where: { userId: payload.userId },
        update: profileUpdate,
        create: { userId: payload.userId, ...profileUpdate },
      })
    }

    const updated = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { profile: true },
    })

    return apiSuccess({ user: updated })
  } catch (error) {
    console.error("Update profile error:", error)
    return apiError("更新资料失败", 500)
  }
}
