const API_BASE = ""

function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" }
  const token = getToken()
  if (token) headers["Authorization"] = `Bearer ${token}`
  return headers
}

export async function apiGet<T = any>(path: string): Promise<{ success: boolean; message?: string; [key: string]: any }> {
  const res = await fetch(`${API_BASE}${path}`, { headers: getHeaders() })
  return res.json()
}

export async function apiPost<T = any>(path: string, data?: unknown): Promise<{ success: boolean; message?: string; [key: string]: any }> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: getHeaders(),
    body: data ? JSON.stringify(data) : undefined,
  })
  return res.json()
}

export async function apiPut<T = any>(path: string, data?: unknown): Promise<{ success: boolean; message?: string; [key: string]: any }> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: getHeaders(),
    body: data ? JSON.stringify(data) : undefined,
  })
  return res.json()
}

export async function apiDelete<T = any>(path: string, data?: unknown): Promise<{ success: boolean; message?: string; [key: string]: any }> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: getHeaders(),
    body: data ? JSON.stringify(data) : undefined,
  })
  return res.json()
}
