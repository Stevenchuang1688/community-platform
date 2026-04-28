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
    <div className="min-h-screen bg-gray-50/50">
      {/* 个人封面 */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-orange-400 via-pink-500 to-red-500"></div>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-16 relative z-10 pb-6">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="text-3xl bg-gradient-to-br from-orange-400 to-red-500 text-white">
                {currentUser.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                  <Star className="h-3 w-3 mr-1" />
                  {currentUser.role === "ORGANIZER" ? "主理人" : "用户"}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1 whitespace-pre-line text-sm">{currentUser.bio}</p>
            </div>
            <div className="flex gap-2">
              <Link href="/profile/settings">
                <Button variant="outline" size="sm">
                  <Edit className="mr-1 h-3 w-3" />
                  编辑资料
                </Button>
              </Link>
              <Link href="/profile/settings">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧栏 */}
          <div className="space-y-6">
            {/* 统计数据 */}
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/profile/activities" className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="text-2xl font-bold">{currentUser.stats.activities}</p>
                    <p className="text-sm text-muted-foreground">活动</p>
                  </Link>
                  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <p className="text-2xl font-bold">{currentUser.stats.followers}</p>
                    <p className="text-sm text-muted-foreground">粉丝</p>
                  </div>
                  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <p className="text-2xl font-bold">{currentUser.stats.following}</p>
                    <p className="text-sm text-muted-foreground">关注</p>
                  </div>
                  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <p className="text-2xl font-bold">{currentUser.stats.likes}</p>
                    <p className="text-sm text-muted-foreground">获赞</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 基本信息 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">基本信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{currentUser.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <LinkIcon className="h-4 w-4" />
                  <a href={currentUser.website} className="text-orange-600 hover:underline">{currentUser.website}</a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span>微信: {currentUser.wechat}</span>
                </div>
              </CardContent>
            </Card>

            {/* 兴趣标签 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">兴趣标签</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentUser.interests.map((interest) => (
                    <Badge key={interest} variant="secondary">{interest}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 技能 */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">技能</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentUser.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={skill.type === "teach" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-blue-100 text-blue-700 hover:bg-blue-100"}>
                        {skill.type === "teach" ? "能教" : "想学"}
                      </Badge>
                      <span className="text-sm">{skill.name}</span>
                    </div>
                    {skill.level && <span className="text-xs text-muted-foreground">{skill.level}</span>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 右侧主内容 */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="overview">动态</TabsTrigger>
                <TabsTrigger value="activities">活动</TabsTrigger>
                <TabsTrigger value="services">服务</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {myPosts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-500 text-white text-sm">
                            {currentUser.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{currentUser.name}</p>
                          <p className="text-xs text-muted-foreground">{post.date}</p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed">{post.content}</p>
                      <div className="flex items-center gap-6 mt-4 pt-4 border-t">
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="activities" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">我发布的活动</h3>
                  <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500">
                    <Calendar className="mr-1 h-3 w-3" />
                    发布活动
                  </Button>
                </div>
                {myActivities.map((activity) => (
                  <Card key={activity.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{activity.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <Badge variant="secondary" className="mb-1">{activity.status}</Badge>
                            <p className="text-xs text-muted-foreground">{activity.registrations} 人报名</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="services" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">我的服务</h3>
                  <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                    <Briefcase className="mr-1 h-3 w-3" />
                    发布服务
                  </Button>
                </div>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">社群运营咨询</h4>
                        <p className="text-sm text-muted-foreground mt-1">1对1深度咨询，帮你解决社群运营难题</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-purple-600">¥299</p>
                        <p className="text-xs text-muted-foreground">已售 32 单</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
