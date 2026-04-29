"use client"

import { useState, useEffect, useCallback } from "react"
import { apiGet } from "@/lib/api-client"

/** 通用 API 数据获取 hook */
export function useApi<T = any>(path: string, defaultValue: T) {
  const [data, setData] = useState<T>(defaultValue)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)
    apiGet(path)
      .then((res) => {
        if (res.success) {
          setData(res.data ?? res)
        } else {
          setError(res.message || "请求失败")
        }
      })
      .catch(() => setError("网络错误"))
      .finally(() => setLoading(false))
  }, [path])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

/** 认证状态 hook */
export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 优先从 localStorage 读取（避免闪烁）
    const stored = localStorage.getItem("user")
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }

    // 再从 API 验证
    apiGet("/api/auth/me")
      .then((res) => {
        if (res.success && res.user) {
          setUser(res.user)
          localStorage.setItem("user", JSON.stringify(res.user))
        } else {
          setUser(null)
          localStorage.removeItem("user")
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { user, loading, isLoggedIn: !!user }
}
