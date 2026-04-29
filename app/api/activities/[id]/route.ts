import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized, apiForbidden, apiNotFound } from "@/lib/api-response"

// GET /api/activities/[id] — 活动详情
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const activity = await prisma.activity.findUnique({
      where: { id: params.id },
      include: {
        organizer: { select: { id: true, name: true, avatar: true, bio: true } },
        registrations: {
          include: { user: { select: { id: true, name: true, avatar: true } } },
          orderBy: { createdAt: "desc" },
        },
        _count: { select: { registrations: true } },
      },
    })

    if (!activity) return apiNotFound("活动不存在")

    // 增加浏览量
    await prisma.activity.update({
      where: { id: params.id },
      data: { viewCount: { increment: 1 } },
    })

    return apiSuccess({ activity })
  } catch (error) {
    console.error("Get activity error:", error)
    return apiError("获取活动详情失败", 500)
  }
}

// PUT /api/activities/[id] — 更新活动
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const activity = await prisma.activity.findUnique({ where: { id: params.id } })
    if (!activity) return apiNotFound("活动不存在")
    if (activity.organizerId !== payload.userId && payload.role !== "ADMIN") {
      return apiForbidden("无权修改此活动")
    }

    const body = await request.json()
    const updateData: any = {}
    const allowedFields = ["title", "description", "type", "startTime", "endTime", "location", "onlineUrl", "maxParticipants", "requireApproval", "registrationDeadline", "status", "coverImage"]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === "startTime" || field === "endTime" || field === "registrationDeadline") {
          updateData[field] = body[field] ? new Date(body[field]) : null
        } else {
          updateData[field] = body[field]
        }
      }
    }

    const updated = await prisma.activity.update({
      where: { id: params.id },
      data: updateData,
      include: { organizer: { select: { id: true, name: true, avatar: true } } },
    })

    return apiSuccess({ activity: updated })
  } catch (error) {
    console.error("Update activity error:", error)
    return apiError("更新活动失败", 500)
  }
}

// DELETE /api/activities/[id] — 取消活动（软删除）
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const activity = await prisma.activity.findUnique({ where: { id: params.id } })
    if (!activity) return apiNotFound("活动不存在")
    if (activity.organizerId !== payload.userId && payload.role !== "ADMIN") {
      return apiForbidden("无权取消此活动")
    }

    const updated = await prisma.activity.update({
      where: { id: params.id },
      data: { status: "CANCELLED" },
    })

    return apiSuccess({ activity: updated })
  } catch (error) {
    console.error("Delete activity error:", error)
    return apiError("取消活动失败", 500)
  }
}
