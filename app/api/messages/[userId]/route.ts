import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"

// GET /api/messages/[userId] — 与某人的聊天记录
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: payload.userId, receiverId: params.userId },
          { senderId: params.userId, receiverId: payload.userId },
        ],
      },
      include: {
        sender: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: "asc" },
      take: 100,
    })

    // 标记未读消息为已读
    await prisma.message.updateMany({
      where: { senderId: params.userId, receiverId: payload.userId, read: false },
      data: { read: true, readAt: new Date() },
    })

    return apiSuccess({ messages })
  } catch (error) {
    console.error("Get chat messages error:", error)
    return apiError("获取聊天记录失败", 500)
  }
}

// POST /api/messages/[userId] — 发送消息
export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    const { content } = await request.json()
    if (!content?.trim()) return apiError("消息内容不能为空")

    // 检查接收者是否存在
    const receiver = await prisma.user.findUnique({ where: { id: params.userId } })
    if (!receiver) return apiError("接收者不存在", 404)
    if (params.userId === payload.userId) return apiError("不能给自己发消息")

    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        senderId: payload.userId,
        receiverId: params.userId,
      },
      include: { sender: { select: { id: true, name: true, avatar: true } } },
    })

    return apiSuccess({ message }, 201)
  } catch (error) {
    console.error("Send message error:", error)
    return apiError("发送消息失败", 500)
  }
}
