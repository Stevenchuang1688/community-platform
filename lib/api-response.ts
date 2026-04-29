import { NextResponse } from "next/server"

export function apiSuccess(data: Record<string, unknown>, status = 200) {
  return NextResponse.json({ success: true, ...data }, { status })
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status })
}

export function apiUnauthorized(message = "请先登录") {
  return NextResponse.json({ success: false, message }, { status: 401 })
}

export function apiForbidden(message = "权限不足") {
  return NextResponse.json({ success: false, message }, { status: 403 })
}

export function apiNotFound(message = "资源不存在") {
  return NextResponse.json({ success: false, message }, { status: 404 })
}
