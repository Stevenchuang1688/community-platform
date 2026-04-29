import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "community-platform-secret-key"

export interface AuthPayload {
  userId: string
  email: string
  role: string
}

/** 从 Authorization: Bearer <token> 验证 JWT */
export function verifyAuth(request: Request): AuthPayload | null {
  const authHeader = request.headers.get("Authorization")
  if (!authHeader?.startsWith("Bearer ")) return null
  try {
    const token = authHeader.substring(7)
    return jwt.verify(token, JWT_SECRET) as AuthPayload
  } catch {
    return null
  }
}

/** 要求已登录，否则抛异常 */
export function requireAuth(request: Request): AuthPayload {
  const payload = verifyAuth(request)
  if (!payload) throw new Error("Unauthorized")
  return payload
}

/** 要求管理员 */
export function requireAdmin(request: Request): AuthPayload {
  const payload = requireAuth(request)
  if (payload.role !== "ADMIN") throw new Error("Forbidden: Admin only")
  return payload
}

/** 生成 JWT token */
export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

/** Cookie 配置 */
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
}
