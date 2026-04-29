import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"

// GET /api/skills — 技能列表
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || undefined
    const type = searchParams.get("type") || undefined
    const search = searchParams.get("search") || undefined

    const where: any = {}
    if (category) where.skill = { category }
    if (type) where.type = type
    if (search) where.skill = { ...where.skill, name: { contains: search, mode: "insensitive" } }

    const skills = await prisma.userSkill.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, avatar: true, bio: true } },
        skill: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return apiSuccess({ skills })
  } catch (error) {
    console.error("List skills error:", error)
    return apiError("获取技能列表失败", 500)
  }
}

// POST /api/skills — 添加用户技能
export async function POST(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const { skillId, type, level, description } = await request.json()
    if (!skillId || !type) return apiError("技能ID和类型为必填")
    if (type !== "TEACH" && type !== "LEARN") return apiError("类型必须为 TEACH 或 LEARN")

    // 检查是否已添加
    const existing = await prisma.userSkill.findUnique({
      where: { userId_skillId_type: { userId: payload.userId, skillId, type } },
    })
    if (existing) return apiError("您已添加该技能")

    const userSkill = await prisma.userSkill.create({
      data: { userId: payload.userId, skillId, type, level: level || null, description: description || null },
      include: { user: { select: { id: true, name: true, avatar: true } }, skill: true },
    })

    return apiSuccess({ userSkill }, 201)
  } catch (error) {
    console.error("Add skill error:", error)
    return apiError("添加技能失败", 500)
  }
}
