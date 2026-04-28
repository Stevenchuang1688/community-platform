"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Search, Plus, Filter } from "lucide-react"

// 模拟活动数据
const activities = [
  {
    id: "1",
    title: "周末桌游社交局",
    description: "欢迎喜欢桌游的朋友一起来玩，新手友好！我们有狼人杀、阿瓦隆、卡坦岛等多种桌游。",
    coverImage: "",
    type: "OFFLINE",
    status: "PUBLISHED",
    startTime: new Date("2026-05-01T14:00:00"),
    location: "深圳市南山区科技园",
    maxParticipants: 12,
    registrations: 8,
    viewCount: 156,
    organizer: { name: "小明", avatar: "" },
    tags: ["桌游", "社交", "周末"],
  },
  {
    id: "2",
    title: "AI绘画入门分享会",
    description: "从零开始学习 Midjourney 和 Stable Diffusion，带你进入AI艺术创作的世界。",
    coverImage: "",
    type: "ONLINE",
    status: "PUBLISHED",
    startTime: new Date("2026-05-03T20:00:00"),
    location: null,
    maxParticipants: 100,
    registrations: 56,
    viewCount: 523,
    organizer: { name: "设计师阿杰", avatar: "" },
    tags: ["AI", "设计", "绘画"],
  },
  {
    id: "3",
    title: "创业者下午茶",
    description: "轻松聊聊创业路上的故事和经验，分享资源，寻找合作伙伴。",
    coverImage: "",
    type: "OFFLINE",
    status: "PUBLISHED",
    startTime: new Date("2026-05-05T15:00:00"),
    location: "深圳市福田区CBD",
    maxParticipants: 8,
    registrations: 5,
    viewCount: 89,
    organizer: { name: "Steven", avatar: "" },
    tags: ["创业", "交流", "资源"],
  },
  {
    id: "4",
    title: "户外徒步 - 塘朗山",
    description: "周末一起去塘朗山徒步，享受大自然，结交新朋友。",
    coverImage: "",
    type: "OFFLINE",
    status: "PUBLISHED",
    startTime: new Date("2026-05-10T08:00:00"),
    location: "深圳市南山区塘朗山",
    maxParticipants: 20,
    registrations: 15,
    viewCount: 234,
    organizer: { name: "户外达人", avatar: "" },
    tags: ["户外", "徒步", "运动"],
  },
  {
    id: "5",
    title: "React 技术分享会",
    description: "深入探讨 React 18 新特性，分享实战经验和最佳实践。",
    coverImage: "",
    type: "HYBRID",
    status: "PUBLISHED",
    startTime: new Date("2026-05-12T19:30:00"),
    location: "深圳市南山区 + 腾讯会议",
    maxParticipants: 50,
    registrations: 32,
    viewCount: 412,
    organizer: { name: "前端小哥", avatar: "" },
    tags: ["技术", "React", "前端"],
  },
  {
    id: "6",
    title: "读书会 - 《人类简史》",
    description: "一起阅读《人类简史》，探讨人类文明的过去与未来。",
    coverImage: "",
    type: "OFFLINE",
    status: "PUBLISHED",
    startTime: new Date("2026-05-15T14:00:00"),
    location: "深圳市福田区图书馆",
    maxParticipants: 15,
    registrations: 10,
    viewCount: 178,
    organizer: { name: "书虫小王", avatar: "" },
    tags: ["读书", "历史", "思考"],
  },
]

export default function ActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || 
                      (activeTab === "online" && activity.type === "ONLINE") ||
                      (activeTab === "offline" && activity.type === "OFFLINE")
    return matchesSearch && matchesTab
  })

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">发现活动</h1>
              <p className="text-muted-foreground mt-1">探索有趣的社群活动，结识志同道合的朋友</p>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Plus className="mr-2 h-4 w-4" />
              发布活动
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container px-4 md:px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索活动..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="offline">线下</TabsTrigger>
              <TabsTrigger value="online">线上</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Activity Grid */}
      <div className="container px-4 md:px-6 pb-12">
        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">没有找到相关活动</h3>
            <p className="text-muted-foreground mt-1">试试其他关键词或筛选条件</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ActivityCard({ activity }: { activity: any }) {
  const typeLabels = {
    ONLINE: "线上",
    OFFLINE: "线下",
    HYBRID: "混合",
  }

  const typeColors = {
    ONLINE: "bg-blue-100 text-blue-700",
    OFFLINE: "bg-green-100 text-green-700",
    HYBRID: "bg-purple-100 text-purple-700",
  }

  return (
    <Link href={`/activities/${activity.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group h-full">
        <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 relative overflow-hidden">
          {activity.coverImage ? (
            <img src={activity.coverImage} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-orange-300">
              <Calendar className="h-12 w-12" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge className={`${typeColors[activity.type as keyof typeof typeColors]} border-0`}>
              {typeLabels[activity.type as keyof typeof typeLabels]}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur">
              <Users className="h-3 w-3 mr-1" />
              {activity.registrations}/{activity.maxParticipants}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg line-clamp-1 group-hover:text-orange-600 transition-colors">
            {activity.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">{activity.description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-orange-500" />
              <span>{activity.startTime.toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            {activity.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="truncate">{activity.location}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={activity.organizer.avatar} />
                <AvatarFallback className="text-xs bg-orange-100 text-orange-700">
                  {activity.organizer.name[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{activity.organizer.name}</span>
            </div>
            <div className="flex gap-1">
              {activity.tags.slice(0, 2).map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
