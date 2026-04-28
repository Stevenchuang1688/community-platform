import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, ArrowRight, Lightbulb, BookOpen, Briefcase, ShoppingBag } from "lucide-react"

// 模拟活动数据
const featuredActivities = [
  {
    id: "1",
    title: "周末桌游社交局",
    description: "欢迎喜欢桌游的朋友一起来玩，新手友好！",
    coverImage: "",
    type: "OFFLINE",
    startTime: new Date("2026-05-01T14:00:00"),
    location: "深圳市南山区",
    maxParticipants: 12,
    registrations: 8,
    organizer: { name: "小明", avatar: "" },
    tags: ["桌游", "社交"],
  },
  {
    id: "2",
    title: "AI绘画入门分享会",
    description: "从零开始学习 Midjourney 和 Stable Diffusion",
    coverImage: "",
    type: "ONLINE",
    startTime: new Date("2026-05-03T20:00:00"),
    location: null,
    maxParticipants: 100,
    registrations: 56,
    organizer: { name: "设计师阿杰", avatar: "" },
    tags: ["AI", "设计"],
  },
  {
    id: "3",
    title: "创业者下午茶",
    description: "轻松聊聊创业路上的故事和经验",
    coverImage: "",
    type: "OFFLINE",
    startTime: new Date("2026-05-05T15:00:00"),
    location: "深圳市福田区",
    maxParticipants: 8,
    registrations: 5,
    organizer: { name: "Steven", avatar: "" },
    tags: ["创业", "交流"],
  },
]

// 技能互换数据
const skillExchanges = [
  { from: "教 Python", to: "学吉他", user: "程序员小李" },
  { from: "教摄影", to: "学英语", user: "摄影师阿华" },
  { from: "教烘焙", to: "学插花", user: "烘焙师小美" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              已有 1,200+ 位主理人加入
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              连接<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">主理人</span>
              <br />
              发现精彩活动
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              发布活动、展示自我、学习成长、交友互动、技能互换、OPC平台
              <br className="hidden sm:block" />
              一站式社群运营解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg px-8">
                探索活动
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                成为主理人
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <FeatureCard
              icon={Calendar}
              title="活动发布"
              description="轻松创建线上线下活动，管理报名和签到"
              href="/activities"
            />
            <FeatureCard
              icon={Lightbulb}
              title="技能互换"
              description="找到想学的技能，结识志同道合的朋友"
              href="/skills"
            />
            <FeatureCard
              icon={BookOpen}
              title="学习专区"
              description="分享知识，参与课程，共同成长"
              href="/learn"
            />
            <FeatureCard
              icon={ShoppingBag}
              title="精选商城"
              description="主理人精选课程、工具和服务"
              href="/shop"
            />
            <FeatureCard
              icon={Briefcase}
              title="OPC平台"
              description="一人公司服务平台，展示个人品牌"
              href="/opc"
            />
          </div>
        </div>
      </section>

      {/* Featured Activities */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">精选活动</h2>
              <p className="text-muted-foreground mt-1">发现有趣的活动，结识新朋友</p>
            </div>
            <Link href="/activities" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              查看全部
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </section>

      {/* Skill Exchange Preview */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">技能互换</h2>
            <p className="text-muted-foreground">
              用你擅长的技能，换取想学的技能，互帮互助，共同进步
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {skillExchanges.map((exchange, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lightbulb className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">{exchange.user}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                      {exchange.from}
                    </Badge>
                    <div className="text-muted-foreground">⇅</div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                      {exchange.to}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/skills">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500">发布我的技能</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">成为主理人，开启你的社群之旅</h2>
              <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
                无论你是想组织活动、分享技能，还是建立个人品牌，这里都是你的最佳起点
              </p>
              <Button size="lg" variant="secondary" className="text-orange-600 font-semibold">
                立即开始
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, href }: { icon: any, title: string, description: string, href: string }) {
  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
        <CardHeader>
          <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Icon className="h-6 w-6 text-orange-600" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}

function ActivityCard({ activity }: { activity: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
      <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 relative overflow-hidden">
        {activity.coverImage ? (
          <img src={activity.coverImage} alt={activity.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-orange-300">
            <Calendar className="h-12 w-12" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur">
            {activity.type === "ONLINE" ? "线上" : "线下"}
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
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{activity.startTime.toLocaleDateString('zh-CN')}</span>
          </div>
          {activity.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{activity.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{activity.registrations}/{activity.maxParticipants} 人已报名</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
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
  )
}
