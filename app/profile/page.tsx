"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Calendar,
  Lightbulb,
  BookOpen,
  ShoppingBag,
  Briefcase,
  Settings,
  MapPin,
  LinkIcon,
  Users,
  Heart,
  Star,
  MessageCircle,
  Edit,
  ArrowRight,
} from "lucide-react"

// 模拟用户数据
const currentUser = {
  name: "Steven Chuang",
  bio: "88年潮汕人 | 摩羯座 | 20+年连续创业者\nTCC潮汕社群大会发起人\n屿见社创空间创始人\n谦懋乐享社群服务平台创始人",
  avatar: "",
  role: "ORGANIZER",
  location: "深圳",
  website: "https://yujian.space",
  wechat: "steven_chuang",
  stats: {
    activities: 24,
    followers: 1280,
    following: 356,
    likes: 3200,
  },
  interests: ["社群运营", "创业", "潮汕文化", "活动策划", "品牌设计"],
  skills: [
    { name: "社群运营", type: "teach", level: "专家" },
    { name: "品牌策划", type: "teach", level: "高级" },
    { name: "短视频", type: "learn", level: "" },
  ],
}

const myActivities = [
  { id: "1", title: "创业者下午茶", date: "5月5日 15:00", status: "进行中", registrations: 8 },
  { id: "2", title: "TCC潮汕社群沙龙", date: "5月12日 14:00", status: "报名中", registrations: 15 },
  { id: "3", title: "主理人交流局", date: "5月20日 19:00", status: "报名中", registrations: 6 },
]

const myPosts = [
  { id: "1", content: "今天在屿见空间举办了一场很棒的主理人交流会，大家分享了各自的社群运营经验...", likes: 56, comments: 12, date: "2小时前" },
  { id: "2", content: "社群运营的核心不是内容，而是关系。你认同吗？", likes: 89, comments: 34, date: "1天前" },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-elegant">
      {/* 个人封面 */}
      <div className="relative">
        <div className="h-48 bg-[#6366F1]"></div>
        <div className="container-elegant">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-16 relative z-10 pb-8">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="text-3xl bg-[#6366F1] text-white">
                {currentUser.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#333]">{currentUser.name}</h1>
                <span className="tag-elegant inline-flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {currentUser.role === "ORGANIZER" ? "主理人" : "用户"}
                </span>
              </div>
              <p className="text-[#888] mt-1 whitespace-pre-line text-sm">{currentUser.bio}</p>
            </div>
            <div className="flex gap-2">
              <Link href="/profile/settings">
                <button className="btn-secondary text-xs">
                  <Edit className="mr-1 h-3 w-3" />
                  编辑资料
                </button>
              </Link>
              <Link href="/profile/settings">
                <button className="btn-secondary h-9 w-9 !px-0">
                  <Settings className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-elegant pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* 左侧栏 */}
          <div className="space-y-8">
            {/* 统计数据 */}
            <div className="card-elegant p-5">
              <div className="grid grid-cols-2 gap-4">
                <Link href="/profile/activities" className="text-center p-3 rounded-xl hover:bg-[#F0F0FF] transition-colors">
                  <p className="text-2xl font-bold text-[#333]">{currentUser.stats.activities}</p>
                  <p className="text-sm text-[#888]">活动</p>
                </Link>
                <div className="text-center p-3 rounded-xl hover:bg-[#F0F0FF] transition-colors cursor-pointer">
                  <p className="text-2xl font-bold text-[#333]">{currentUser.stats.followers}</p>
                  <p className="text-sm text-[#888]">粉丝</p>
                </div>
                <div className="text-center p-3 rounded-xl hover:bg-[#F0F0FF] transition-colors cursor-pointer">
                  <p className="text-2xl font-bold text-[#333]">{currentUser.stats.following}</p>
                  <p className="text-sm text-[#888]">关注</p>
                </div>
                <div className="text-center p-3 rounded-xl hover:bg-[#F0F0FF] transition-colors cursor-pointer">
                  <p className="text-2xl font-bold text-[#333]">{currentUser.stats.likes}</p>
                  <p className="text-sm text-[#888]">获赞</p>
                </div>
              </div>
            </div>

            {/* 基本信息 */}
            <div className="card-elegant p-5">
              <h3 className="font-semibold text-sm text-[#333] mb-4">基本信息</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-[#888]">
                  <MapPin className="h-4 w-4" />
                  <span>{currentUser.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#888]">
                  <LinkIcon className="h-4 w-4" />
                  <a href={currentUser.website} className="text-[#6366F1] hover:underline">{currentUser.website}</a>
                </div>
                <div className="flex items-center gap-2 text-[#888]">
                  <MessageCircle className="h-4 w-4" />
                  <span>微信: {currentUser.wechat}</span>
                </div>
              </div>
            </div>

            {/* 兴趣标签 */}
            <div className="card-elegant p-5">
              <h3 className="font-semibold text-sm text-[#333] mb-4">兴趣标签</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.interests.map((interest) => (
                  <span key={interest} className="tag-elegant">{interest}</span>
                ))}
              </div>
            </div>

            {/* 技能 */}
            <div className="card-elegant p-5">
              <h3 className="font-semibold text-sm text-[#333] mb-4">技能</h3>
              <div className="space-y-2">
                {currentUser.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        skill.type === "teach" ? "bg-[#F0F0FF] text-[#6366F1]" : "bg-[#6366F1] text-[#F0F0FF]"
                      }`}>
                        {skill.type === "teach" ? "能教" : "想学"}
                      </span>
                      <span className="text-sm text-[#333]">{skill.name}</span>
                    </div>
                    {skill.level && <span className="text-xs text-[#888]">{skill.level}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧主内容 */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start mb-8">
                <TabsTrigger value="overview">动态</TabsTrigger>
                <TabsTrigger value="activities">活动</TabsTrigger>
                <TabsTrigger value="services">服务</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {myPosts.map((post) => (
                  <div key={post.id} className="card-elegant p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#6366F1] text-white text-sm">
                          {currentUser.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-[#333]">{currentUser.name}</p>
                        <p className="text-xs text-[#888]">{post.date}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#333] leading-relaxed">{post.content}</p>
                    <div className="divider-light mt-4" />
                    <div className="flex items-center gap-6 mt-4">
                      <button className="flex items-center gap-1.5 text-[#888] hover:text-[#6366F1] transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-[#888] hover:text-[#6366F1] transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="activities" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[#333]">我发布的活动</h3>
                  <button className="btn-primary text-xs">
                    <Calendar className="mr-1 h-3 w-3" />
                    发布活动
                  </button>
                </div>
                {myActivities.map((activity) => (
                  <div key={activity.id} className="card-elegant p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm text-[#333]">{activity.title}</h4>
                        <p className="text-sm text-[#888] mt-1">{activity.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="tag-elegant mb-1 inline-block">{activity.status}</span>
                          <p className="text-xs text-[#888]">{activity.registrations} 人报名</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-[#888]" />
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="services" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[#333]">我的服务</h3>
                  <button className="btn-primary text-xs">
                    <Briefcase className="mr-1 h-3 w-3" />
                    发布服务
                  </button>
                </div>
                <div className="card-elegant p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm text-[#333]">社群运营咨询</h4>
                      <p className="text-sm text-[#888] mt-1">1对1深度咨询，帮你解决社群运营难题</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#6366F1]">¥299</p>
                      <p className="text-xs text-[#888]">已售 32 单</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
