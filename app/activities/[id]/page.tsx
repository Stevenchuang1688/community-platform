"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, CheckCircle2, UserPlus } from "lucide-react"
import { apiGet, apiPost } from "@/lib/api-client"

export default function ActivityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activity, setActivity] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [registering, setRegistering] = useState(false)
  const [registered, setRegistered] = useState(false)

  useEffect(() => {
    if (params.id) {
      apiGet(`/api/activities/${params.id}`)
        .then((res) => {
          if (res.success) setActivity(res.activity)
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }
  }, [params.id])

  const handleRegister = async () => {
    setRegistering(true)
    try {
      const res = await apiPost(`/api/activities/${params.id}/register`)
      if (res.success) {
        setRegistered(true)
        alert(res.registration?.status === "PENDING" ? "报名成功，等待审核" : "报名成功！")
      } else {
        alert(res.message || "报名失败")
      }
    } catch {
      alert("网络错误")
    } finally {
      setRegistering(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-elegant flex items-center justify-center">
        <div className="text-[#888]">加载中...</div>
      </div>
    )
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-gradient-elegant flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#333] mb-4">活动不存在</h2>
          <Link href="/activities"><Button className="btn-primary">返回活动列表</Button></Link>
        </div>
      </div>
    )
  }

  const regCount = activity._count?.registrations ?? activity.registrations?.length ?? 0
  const startTime = new Date(activity.startTime)

  return (
    <div className="min-h-screen bg-gradient-elegant">
      <div className="container-elegant section-spacing max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/activities"><Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button></Link>
          <h1 className="text-xl font-bold text-[#333]">活动详情</h1>
        </div>

        {/* 封面 */}
        <div className="aspect-[16/7] rounded-2xl bg-gradient-to-br from-[#F0F0FF] to-[#EEF2FF] flex items-center justify-center mb-8 overflow-hidden">
          {activity.coverImage ? (
            <img src={activity.coverImage} alt={activity.title} className="w-full h-full object-cover" />
          ) : (
            <Calendar className="h-16 w-16 text-[#6366F1]/20" />
          )}
        </div>

        {/* 标题区 */}
        <div className="card-elegant p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-[#F0F0FF] text-[#6366F1] hover:bg-[#F0F0FF]">
                  {activity.type === "ONLINE" ? "🌐 线上" : activity.type === "OFFLINE" ? "📍 线下" : "🔄 混合"}
                </Badge>
                <Badge variant="outline" className="text-xs">{activity.status}</Badge>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{activity.title}</h1>
            </div>
            <button className="p-2 text-gray-400 hover:text-[#6366F1] transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Calendar className="h-5 w-5 text-[#6366F1]" />
              <div>
                <p className="font-medium">{startTime.toLocaleDateString('zh-CN')}</p>
                <p className="text-xs text-gray-400">{startTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
            {activity.location && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="h-5 w-5 text-[#6366F1]" />
                <span>{activity.location}</span>
              </div>
            )}
            {activity.onlineUrl && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="h-5 w-5 text-[#6366F1]" />
                <a href={activity.onlineUrl} target="_blank" className="text-[#6366F1] hover:underline">线上链接</a>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Users className="h-5 w-5 text-[#6366F1]" />
              <span>{regCount}/{activity.maxParticipants || "不限"} 人</span>
            </div>
          </div>

          <Separator className="my-4" />

          {/* 组织者 */}
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-[#6366F1]/10">
              <AvatarFallback className="bg-[#F0F0FF] text-[#6366F1]">{activity.organizer?.name?.[0] || "?"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm text-[#333]">{activity.organizer?.name || "匿名"}</p>
              <p className="text-xs text-[#888]">活动发起人</p>
            </div>
          </div>
        </div>

        {/* 描述 */}
        <div className="card-elegant p-6 mb-6">
          <h2 className="text-lg font-semibold text-[#333] mb-4">活动详情</h2>
          <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
            {activity.description}
          </div>
        </div>

        {/* 报名按钮 */}
        <div className="card-elegant p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#888]">名额</p>
              <p className="text-lg font-bold text-[#333]">{regCount}/{activity.maxParticipants || "不限"}</p>
            </div>
            {registered ? (
              <div className="flex items-center gap-2 text-[#6366F1] font-medium">
                <CheckCircle2 className="h-5 w-5" />已报名
              </div>
            ) : (
              <button onClick={handleRegister} disabled={registering} className="btn-primary text-base px-8 py-3">
                <UserPlus className="h-4 w-4 mr-2" />
                {registering ? "报名中..." : "立即报名"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
