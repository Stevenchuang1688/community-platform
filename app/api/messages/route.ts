import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth"
import { apiSuccess, apiError, apiUnauthorized } from "@/lib/api-response"

// GET /api/messages — 会话列表
export async function GET(request: Request) {
  try {
    const payload = verifyAuth(request)
    if (!payload) return apiUnauthorized()

    // 获取与当前用户有过消息的所有用户
    const sentMessages = await prisma.message.findMany({
      where: { senderId: payload.userId },
      select: { receiverId: true },
      distinct: ["receiverId"],
    })

    const receivedMessages = await prisma.message.findMany({
      where: { receiverId: payload.userId },
      select: { senderId: true },
      distinct: ["senderId"],
    })

    const partnerIds = Array.from(new Set([
      ...sentMessages.map(m => m.receiverId),
      ...receivedMessages.map(m => m.senderId),
    ]))

    if (!partnerIds.length) return apiSuccess({ conversations: [] })

    // 获取每个会话的最后一条消息
    const conversations = await Promise.all(
      partnerIds.map(async (partnerId) => {
        const lastMessage = await prisma.message.findFirst({
          where: {
            OR: [
              { senderId: payload.userId, receiverId: partnerId },
              { senderId: partnerId, receiverId: payload.userId },
            ],
          },
          orderBy: { createdAt: "desc" },
        })

        const partner = await prisma.user.findUnique({
          where: { id: partnerId },
          select: { id: true, name: true, avatar: true },
        })

        const unreadCount = await prisma.message.count({
          where: { senderId: partnerId, receiverId: payload.userId, read: false },
        })

        return {
          partner,
          lastMessage,
          unreadCount,
        }
      })
    )

    // 按最后消息时间排序
    conversations.sort((a, b) =>
      new Date(b.lastMessage?.createdAt || 0).getTime() - new Date(a.lastMessage?.createdAt || 0).getTime()
    )

    return apiSuccess({ conversations })
  } catch (error) {
    console.error("List messages error:", error)
    return apiError("获取消息列表失败", 500)
  }
}
