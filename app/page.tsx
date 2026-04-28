import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, ArrowRight, Lightbulb } from "lucide-react"

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
    <div className="min-h-screen bg-white">
      {/* Hero Section - 极简松弛感 */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-[#F5F1E9] via-white to-white">
        <div className="container-elegant">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 左侧文案 */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium" style={{ backgroundColor: '#F5F1E9', color: '#2C4A46' }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: '#2C4A46' }}></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: '#2C4A46' }}></span>
                </span>
                已有 1,200+ 位主理人加入
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  汇聚本地主理人
                  <br />
                  <span style={{ color: '#2C4A46' }}>共建社群商业新生态</span>
                </h1>
                <p className="text-base md:text-lg text-gray-600 max-w-lg leading-relaxed">
                  以个体链接城市，用社群创造连接。
                  <br className="hidden sm:block" />
                  在这里发现同频的人，一起做有意义的事。
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button className="btn-primary px-8 py-3 text-base">
                    立即入驻
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/activities">
                  <Button variant="outline" className="btn-secondary px-8 py-3 text-base">
                    了解联盟
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* 右侧配图区 - 低饱和文创风 */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#F5F1E9]">
                {/* 占位图 - 实际使用时替换为屿见社创空间实拍 */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#2C4A46' }}>
                      <span className="text-white text-2xl font-bold">谦</span>
                    </div>
                    <p className="text-sm text-gray-500">嶼見社創空間实拍图</p>
                  </div>
                </div>
              </div>
              {/* 装饰元素 */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl -z-10" style={{ backgroundColor: '#F5F1E9' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - 卡片化 */}
      <section className="section-spacing bg-white">
        <div className="container-elegant">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">联盟服务</h2>
            <p className="text-gray-500">为潮汕本地主理人提供全方位支持</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <FeatureCard
              title="活动发布"
              description="轻松创建线上线下活动"
              href="/activities"
            />
            <FeatureCard
              title="技能互换"
              description="找到想学的技能"
              href="/skills"
            />
            <FeatureCard
              title="学习专区"
              description="分享知识共同成长"
              href="/learn"
            />
            <FeatureCard
              title="OPC平台"
              description="一人公司服务平台"
              href="/opc"
            />
          </div>
        </div>
      </section>

      {/* 分隔线 */}
      <div className="divider-light" />

      {/* Featured Activities - 卡片化 */}
      <section className="section-spacing bg-white">
        <div className="container-elegant">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">精选活动</h2>
              <p className="text-gray-500 text-sm">发现有趣的活动，结识新朋友</p>
            </div>
            <Link href="/activities" className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-gray-900" style={{ color: '#2C4A46' }}>
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

      {/* 分隔线 */}
      <div className="divider-light" />

      {/* Skill Exchange Preview - 卡片化 */}
      <section className="section-spacing bg-white">
        <div className="container-elegant">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">技能互换</h2>
            <p className="text-gray-500 text-sm">
              用你擅长的技能，换取想学的技能，互帮互助，共同进步
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {skillExchanges.map((exchange, index) => (
              <div key={index} className="card-elegant p-6 text-center">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#F5F1E9' }}>
                  <Lightbulb className="h-5 w-5" style={{ color: '#2C4A46' }} />
                </div>
                <h3 className="font-medium text-gray-900 mb-3">{exchange.user}</h3>
                <div className="space-y-2">
                  <span className="tag-elegant">{exchange.from}</span>
                  <div className="text-gray-300 text-lg">⇅</div>
                  <span className="tag-elegant">{exchange.to}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/skills">
              <Button className="btn-primary">
                发布我的技能
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - 莫兰迪深绿 */}
      <section className="section-spacing" style={{ backgroundColor: '#2C4A46' }}>
        <div className="container-elegant">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">成为主理人，开启你的社群之旅</h2>
            <p className="text-white/70 text-base mb-8">
              无论你是想组织活动、分享技能，还是建立个人品牌，这里都是你的最佳起点
            </p>
            <Link href="/register">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-xl font-medium">
                立即开始
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ title, description, href }: { title: string, description: string, href: string }) {
  return (
    <Link href={href}>
      <div className="card-elegant p-5 h-full group">
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#2C4A46] transition-colors">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  )
}

function ActivityCard({ activity }: { activity: any }) {
  return (
    <Link href={`/activities`}>
      <div className="card-elegant overflow-hidden group cursor-pointer">
        {/* 图片区 */}
        <div className="aspect-[16/10] bg-[#F5F1E9] relative overflow-hidden">
          {activity.coverImage ? (
            <img src={activity.coverImage} alt={activity.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Calendar className="h-10 w-10 text-gray-300" />
            </div>
          )}
          {/* 类型标签 */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium bg-white/90 backdrop-blur text-gray-700">
              {activity.type === "ONLINE" ? "线上" : "线下"}
            </span>
          </div>
        </div>
        
        {/* 内容区 */}
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#2C4A46] transition-colors line-clamp-1">
            {activity.title}
          </h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">{activity.description}</p>
          
          {/* 元信息 */}
          <div className="space-y-2 text-sm text-gray-500">
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
          </div>
          
          {/* 底部信息 */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7 border border-gray-100">
                <AvatarFallback className="text-xs bg-[#F5F1E9] text-[#2C4A46]">
                  {activity.organizer.name[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-500">{activity.organizer.name}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Users className="h-3.5 w-3.5" />
              <span>{activity.registrations}/{activity.maxParticipants}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
