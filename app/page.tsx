"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, ArrowRight, Lightbulb, Sparkles, Zap, BookOpen, Briefcase } from "lucide-react"
import { apiGet } from "@/lib/api-client"

const defaultActivities = [
  { id: "1", title: "周末桌游社交局", description: "欢迎喜欢桌游的朋友一起来玩，新手友好！", coverImage: "", type: "OFFLINE", startTime: "2026-05-01T14:00:00", location: "深圳市南山区", maxParticipants: 12, _count: { registrations: 8 }, organizer: { name: "小明", avatar: "" } },
  { id: "2", title: "AI绘画入门分享会", description: "从零开始学习 Midjourney 和 Stable Diffusion", coverImage: "", type: "ONLINE", startTime: "2026-05-03T20:00:00", location: null, maxParticipants: 100, _count: { registrations: 56 }, organizer: { name: "设计师阿杰", avatar: "" } },
  { id: "3", title: "创业者下午茶", description: "轻松聊聊创业路上的故事和经验", coverImage: "", type: "OFFLINE", startTime: "2026-05-05T15:00:00", location: "深圳市福田区", maxParticipants: 8, _count: { registrations: 5 }, organizer: { name: "Steven", avatar: "" } },
]

const defaultSkills = [
  { from: "教 Python", to: "学吉他", user: "程序员小李" },
  { from: "教摄影", to: "学英语", user: "摄影师阿华" },
  { from: "教烘焙", to: "学插花", user: "烘焙师小美" },
]

const features = [
  { icon: Calendar, title: "活动发布", desc: "轻松创建线上线下活动", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Lightbulb, title: "技能互换", desc: "找到想学的技能", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: BookOpen, title: "学习专区", desc: "分享知识共同成长", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: Briefcase, title: "OPC平台", desc: "一人公司服务平台", color: "text-purple-500", bg: "bg-purple-50" },
]

export default function HomePage() {
  const [activities, setActivities] = useState(defaultActivities)
  const [skills, setSkills] = useState(defaultSkills)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      apiGet("/api/activities?limit=3").catch(() => null),
      apiGet("/api/skills?limit=6").catch(() => null),
    ]).then(([actRes, skillRes]) => {
      if (actRes?.success && actRes.activities?.length) setActivities(actRes.activities)
      if (skillRes?.success && skillRes.skills?.length) {
        // 将 userSkills 转换为简化格式用于展示
        const simplified = skillRes.skills.slice(0, 3).map((s: any) => ({
          from: s.type === "TEACH" ? `教 ${s.skill?.name || s.skillId}` : `学 ${s.skill?.name || s.skillId}`,
          to: s.type === "TEACH" ? "想学新技能" : "有一技之长",
          user: s.user?.name || "匿名用户",
        }))
        if (simplified.length) setSkills(simplified)
      }
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFBFF]">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-hero">
        <div className="container-elegant">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#F0F0FF] text-[#6366F1]">
                <Sparkles className="h-3.5 w-3.5" />
                已有 1,200+ 位主理人加入
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  汇聚本地主理人
                  <br />
                  <span className="text-[#6366F1]">共建社群商业新生态</span>
                </h1>
                <p className="text-base md:text-lg text-gray-500 max-w-lg leading-relaxed">
                  以个体链接城市，用社群创造连接。
                  <br className="hidden sm:block" />
                  在这里发现同频的人，一起做有意义的事。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button className="btn-cta text-base px-8 py-3"><Zap className="h-4 w-4 mr-1" />立即入驻</Button>
                </Link>
                <Link href="/activities">
                  <Button className="btn-secondary text-base px-8 py-3">了解联盟</Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#6366F1]/10 to-[#F0F0FF]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center bg-[#6366F1] shadow-lg shadow-indigo-200">
                      <span className="text-white text-2xl font-bold">谦</span>
                    </div>
                    <p className="text-sm text-gray-400">嶼見社創空間实拍图</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl -z-10 bg-[#F0F0FF]" />
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-xl -z-10 bg-amber-100" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-spacing bg-white">
        <div className="container-elegant">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">联盟服务</h2>
            <p className="text-gray-500">为潮汕本地主理人提供全方位支持</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {features.map((f) => (
              <Link key={f.title} href={f.title === "活动发布" ? "/activities" : f.title === "技能互换" ? "/skills" : f.title === "学习专区" ? "/learn" : "/opc"}>
                <div className="card-elegant p-6 h-full group cursor-pointer">
                  <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <f.icon className={`h-6 w-6 ${f.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#6366F1] transition-colors">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-light" />

      {/* Activities */}
      <section className="section-spacing bg-white">
        <div className="container-elegant">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">精选活动</h2>
              <p className="text-gray-500 text-sm">发现有趣的活动，结识新朋友</p>
            </div>
            <Link href="/activities" className="flex items-center gap-1 text-sm font-semibold text-[#6366F1] hover:text-[#4F46E5] transition-colors">
              查看全部 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity: any) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      <div className="divider-light" />

      {/* Skills */}
      <section className="section-spacing bg-white">
        <div className="container-elegant">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">技能互换</h2>
            <p className="text-gray-500 text-sm">用你擅长的技能，换取想学的技能</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {skills.map((exchange: any, index: number) => (
              <div key={index} className="card-elegant p-6 text-center">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4 bg-[#F0F0FF]">
                  <Lightbulb className="h-5 w-5 text-[#6366F1]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">{exchange.user}</h3>
                <div className="space-y-2">
                  <span className="tag-elegant">{exchange.from}</span>
                  <div className="text-gray-300 text-lg">⇅</div>
                  <span className="tag-elegant">{exchange.to}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/skills"><Button className="btn-primary">发布我的技能</Button></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #6366F1 100%)' }}>
        <div className="container-elegant">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">成为主理人，开启你的社群之旅</h2>
            <p className="text-white/70 text-base mb-8">无论你是想组织活动、分享技能，还是建立个人品牌，这里都是你的最佳起点</p>
            <Link href="/register">
              <Button className="btn-cta text-base px-8 py-3"><Zap className="h-4 w-4 mr-1" />立即开始</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function ActivityCard({ activity }: { activity: any }) {
  const regCount = activity._count?.registrations ?? activity.registrations ?? 0
  const maxP = activity.maxParticipants ?? "不限"
  const startTime = new Date(activity.startTime)

  return (
    <Link href={`/activities/${activity.id}`}>
      <div className="card-elegant overflow-hidden group cursor-pointer">
        <div className="aspect-[16/10] bg-gradient-to-br from-[#F0F0FF] to-[#EEF2FF] relative overflow-hidden">
          {activity.coverImage ? (
            <img src={activity.coverImage} alt={activity.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Calendar className="h-10 w-10 text-[#6366F1]/20" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-white/90 backdrop-blur text-gray-700 shadow-sm">
              {activity.type === "ONLINE" ? "🌐 线上" : "📍 线下"}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#6366F1] transition-colors line-clamp-1">{activity.title}</h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{activity.description}</p>
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{startTime.toLocaleDateString('zh-CN')}</span></div>
            {activity.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span className="truncate">{activity.location}</span></div>}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7 border-2 border-[#6366F1]/10">
                <AvatarFallback className="text-xs bg-[#F0F0FF] text-[#6366F1]">{activity.organizer?.name?.[0] || "?"}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-500">{activity.organizer?.name || "匿名"}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Users className="h-3.5 w-3.5" />
              <span>{regCount}/{maxP}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
