import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized, apiNotFound } from "@/lib/api-response"

// POST /api/activities/[id]/register — 报名活动
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const activity = await prisma.activity.findUnique({
      where: { id: params.id },
      include: { _count: { select: { registrations: true } } },
    })

    if (!activity) return apiNotFound("活动不存在")
    if (activity.status !== "PUBLISHED" && activity.status !== "ONGOING") {
      return apiError("该活动暂不可报名")
    }

    // 检查是否已报名
    const existing = await prisma.activityRegistration.findUnique({
      where: { activityId_userId: { activityId: params.id, userId: payload.userId } },
    })
    if (existing) return apiError("您已报名该活动")

    // 检查人数限制
    if (activity.maxParticipants && activity._count.registrations >= activity.maxParticipants) {
      return apiError("活动名额已满")
    }

    const body = await request.json().catch(() => ({}))
    const registration = await prisma.activityRegistration.create({
      data: {
        activityId: params.id,
        userId: payload.userId,
        status: activity.requireApproval ? "PENDING" : "APPROVED",
        remark: body.remark || null,
      },
    })

    return apiSuccess({ registration }, 201)
  } catch (error) {
    console.error("Register activity error:", error)
    return apiError("报名失败", 500)
  }
}

// DELETE /api/activities/[id]/register — 取消报名
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const registration = await prisma.activityRegistration.findUnique({
      where: { activityId_userId: { activityId: params.id, userId: payload.userId } },
    })

    if (!registration) return apiNotFound("未找到报名记录")

    await prisma.activityRegistration.update({
      where: { id: registration.id },
      data: { status: "CANCELLED" },
    })

    return apiSuccess({ message: "已取消报名" })
  } catch (error) {
    console.error("Cancel registration error:", error)
    return apiError("取消报名失败", 500)
  }
}
