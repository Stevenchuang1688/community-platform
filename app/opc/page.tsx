"use client"

import { Briefcase, Star, TrendingUp, DollarSign, Plus, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

const services = [
  {
    id: "1",
    title: "品牌设计咨询",
    description: "为企业提供品牌视觉设计、Logo设计、VI设计等服务",
    provider: { name: "设计师阿杰", avatar: "" },
    price: 500,
    unit: "小时",
    rating: 4.9,
    orders: 32,
    category: "设计",
    tags: ["品牌设计", "Logo", "VI"],
  },
  {
    id: "2",
    title: "公众号运营服务",
    description: "专业的公众号内容策划、排版、运营推广服务",
    provider: { name: "运营达人", avatar: "" },
    price: 3000,
    unit: "月",
    rating: 4.8,
    orders: 28,
    category: "运营",
    tags: ["公众号", "内容运营", "增长"],
  },
  {
    id: "3",
    title: "短视频剪辑制作",
    description: "高质量短视频剪辑，适用于抖音、快手、视频号等平台",
    provider: { name: "剪辑师小王", avatar: "" },
    price: 200,
    unit: "条",
    rating: 4.7,
    orders: 56,
    category: "视频",
    tags: ["短视频", "剪辑", "后期"],
  },
]

const topProviders = [
  { name: "设计师阿杰", service: "品牌设计", rating: 4.9, orders: 128 },
  { name: "摄影师阿华", service: "商业摄影", rating: 4.9, orders: 96 },
  { name: "运营达人", service: "新媒体运营", rating: 4.8, orders: 85 },
]

export default function OPCPage() {
  return (
    <div className="min-h-screen bg-gradient-elegant">
      {/* Header */}
      <div className="bg-[#6366F1] text-white">
        <div className="container-elegant py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">OPC 一人公司平台</h1>
              <p className="text-[#F0F0FF]/80 mt-1 text-sm">展示个人品牌，提供专业服务</p>
            </div>
            <button className="btn-secondary bg-[#F0F0FF] text-[#6366F1] border-[#F0F0FF] hover:bg-white">
              <Plus className="mr-2 h-4 w-4" />
              发布服务
            </button>
          </div>
        </div>
      </div>

      <div className="container-elegant section-spacing">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard icon={Briefcase} label="活跃服务" value="156" />
          <StatCard icon={Star} label="好评率" value="98%" />
          <StatCard icon={TrendingUp} label="成交订单" value="2.4k" />
          <StatCard icon={DollarSign} label="总交易额" value="¥128k" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Services */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                <Input placeholder="搜索服务..." className="pl-10 input-elegant" />
              </div>
              <button className="btn-secondary text-sm">筛选</button>
            </div>

            <div className="grid gap-4">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="card-elegant p-5 bg-[#F0F0FF]">
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-base font-semibold text-[#333]">成为服务者</CardTitle>
                <CardDescription className="text-sm text-[#888]">发布你的专业技能，开始接单赚钱</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <button className="btn-primary w-full">
                  <Briefcase className="mr-2 h-4 w-4" />
                  立即入驻
                </button>
              </CardContent>
            </div>

            <div className="card-elegant p-5">
              <CardHeader className="p-0 pb-3">
                <CardTitle className="text-base font-semibold text-[#333]">热门服务者</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                {topProviders.map((provider, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#F0F0FF] text-[#6366F1] text-sm">
                        {provider.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-[#333] truncate">{provider.name}</p>
                      <p className="text-xs text-[#888]">{provider.service}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-[#6366F1]">
                        <Star className="h-3 w-3 fill-current" />
                        {provider.rating}
                      </div>
                      <p className="text-xs text-[#888]">{provider.orders}单</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </div>

            <div className="card-elegant p-5">
              <CardHeader className="p-0 pb-3">
                <CardTitle className="text-base font-semibold text-[#333]">服务分类</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-wrap gap-2">
                  {["设计", "开发", "运营", "写作", "翻译", "咨询", "摄影", "视频"].map((cat) => (
                    <span key={cat} className="tag-elegant cursor-pointer hover:opacity-80">
                      {cat}
                    </span>
                  ))}
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="card-elegant p-6 flex items-center gap-4">
      <div className="w-12 h-12 bg-[#F0F0FF] rounded-xl flex items-center justify-center">
        <Icon className="h-6 w-6 text-[#6366F1]" />
      </div>
      <div>
        <p className="text-2xl font-bold text-[#333]">{value}</p>
        <p className="text-sm text-[#888]">{label}</p>
      </div>
    </div>
  )
}

function ServiceCard({ service }: { service: any }) {
  return (
    <div className="card-elegant p-6">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <span className="tag-elegant mb-2 inline-block">
                {service.category}
              </span>
              <h3 className="font-semibold text-base text-[#333]">{service.title}</h3>
              <p className="text-sm text-[#888] mt-1">{service.description}</p>
            </div>
            <div className="text-right ml-4">
              <p className="text-2xl font-bold text-[#6366F1]">¥{service.price}</p>
              <p className="text-sm text-[#888]">/{service.unit}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3">
            {service.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs text-[#888]">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="divider-light mt-4" />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={service.provider.avatar} />
                <AvatarFallback className="text-xs bg-[#F0F0FF] text-[#6366F1]">
                  {service.provider.name[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-[#888]">{service.provider.name}</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-[#6366F1]">
                <Star className="h-4 w-4 fill-current" />
                <span>{service.rating}</span>
              </div>
              <span className="text-[#888]">{service.orders} 单成交</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
