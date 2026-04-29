import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"
import { NextResponse } from "next/server"

// GET /api/activities — 活动列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "12")
    const type = searchParams.get("type") || undefined
    const search = searchParams.get("search") || undefined

    const where: any = { status: "PUBLISHED" }
    if (type) where.type = type
    if (search) where.title = { contains: search, mode: "insensitive" }

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        include: {
          organizer: { select: { id: true, name: true, avatar: true } },
          _count: { select: { registrations: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.activity.count({ where }),
    ])

    return apiSuccess({
      activities,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("List activities error:", error)
    return apiError("获取活动列表失败", 500)
  }
}

// POST /api/activities — 创建活动
export async function POST(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    if (payload.role !== "ORGANIZER" && payload.role !== "ADMIN") {
      return apiError("仅主理人或管理员可发布活动", 403)
    }

    const body = await request.json()
    const { title, description, type, startTime, endTime, location, onlineUrl, maxParticipants, requireApproval, registrationDeadline } = body

    if (!title || !description || !type || !startTime) {
      return apiError("标题、描述、类型和开始时间为必填")
    }

    const activity = await prisma.activity.create({
      data: {
        title,
        description,
        type,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        location: location || null,
        onlineUrl: onlineUrl || null,
        maxParticipants: maxParticipants || null,
        requireApproval: requireApproval || false,
        registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
        organizerId: payload.userId,
        status: "DRAFT",
      },
      include: {
        organizer: { select: { id: true, name: true, avatar: true } },
      },
    })

    return apiSuccess({ activity }, 201)
  } catch (error) {
    console.error("Create activity error:", error)
    return apiError("创建活动失败", 500)
  }
}
