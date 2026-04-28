"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Lightbulb, ArrowRight, Filter } from "lucide-react"

// 技能分类
const skillCategories = [
  { id: "tech", name: "技术", icon: "💻" },
  { id: "design", name: "设计", icon: "🎨" },
  { id: "language", name: "语言", icon: "🌐" },
  { id: "business", name: "商业", icon: "💼" },
  { id: "lifestyle", name: "生活", icon: "🌱" },
  { id: "art", name: "艺术", icon: "🎭" },
  { id: "sports", name: "运动", icon: "⚽" },
  { id: "other", name: "其他", icon: "✨" },
]

// 模拟技能数据
const skillsData = [
  {
    id: "1",
    user: { name: "程序员小李", avatar: "" },
    teach: { name: "Python 编程", category: "tech", level: "EXPERT" },
    learn: { name: "吉他弹唱", category: "art" },
    description: "有5年Python开发经验，想学习吉他弹唱，可以交换教学",
    location: "深圳",
    createdAt: new Date("2026-04-20"),
  },
  {
    id: "2",
    user: { name: "摄影师阿华", avatar: "" },
    teach: { name: "人像摄影", category: "art", level: "ADVANCED" },
    learn: { name: "英语口语", category: "language" },
    description: "专业摄影师，擅长人像和风景摄影，想提升英语口语能力",
    location: "深圳",
    createdAt: new Date("2026-04-22"),
  },
  {
    id: "3",
    user: { name: "烘焙师小美", avatar: "" },
    teach: { name: "法式烘焙", category: "lifestyle", level: "EXPERT" },
    learn: { name: "插花艺术", category: "art" },
    description: "热爱烘焙，擅长法式甜点制作，想学习插花装饰",
    location: "深圳",
    createdAt: new Date("2026-04-23"),
  },
  {
    id: "4",
    user: { name: "英语老师Tom", avatar: "" },
    teach: { name: "英语口语", category: "language", level: "EXPERT" },
    learn: { name: "中国书法", category: "art" },
    description: "母语英语，有10年教学经验，对中国书法很感兴趣",
    location: "深圳",
    createdAt: new Date("2026-04-24"),
  },
  {
    id: "5",
    user: { name: "瑜伽教练Lisa", avatar: "" },
    teach: { name: "瑜伽冥想", category: "sports", level: "EXPERT" },
    learn: { name: "短视频剪辑", category: "tech" },
    description: "瑜伽教练，想学习视频剪辑来记录瑜伽生活",
    location: "深圳",
    createdAt: new Date("2026-04-25"),
  },
  {
    id: "6",
    user: { name: "设计师阿杰", avatar: "" },
    teach: { name: "UI/UX设计", category: "design", level: "ADVANCED" },
    learn: { name: "产品运营", category: "business" },
    description: "5年设计经验，想了解产品运营知识",
    location: "深圳",
    createdAt: new Date("2026-04-26"),
  },
]

export default function SkillsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredSkills = skillsData.filter((skill) => {
    const matchesSearch =
      skill.teach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.learn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory ||
      skill.teach.category === selectedCategory ||
      skill.learn.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-elegant">
      {/* Header */}
      <div className="bg-[#6366F1] text-white">
        <div className="container-elegant py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">技能互换</h1>
              <p className="text-[#F0F0FF]/80 mt-1 text-sm">用你擅长的技能，换取想学的技能</p>
            </div>
            <button className="btn-secondary bg-[#F0F0FF] text-[#6366F1] border-[#F0F0FF] hover:bg-white">
              <Plus className="mr-2 h-4 w-4" />
              发布技能
            </button>
          </div>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="container-elegant section-spacing">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="w-full md:w-64 space-y-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
              <Input
                placeholder="搜索技能..."
                className="pl-10 input-elegant"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                <Filter className="h-4 w-4" />
                技能分类
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-xl transition-colors text-sm ${
                    selectedCategory === null ? 'bg-[#F0F0FF] text-[#6366F1] font-medium' : 'hover:bg-[#F0F0FF]/50 text-[#333]'
                  }`}
                >
                  全部技能
                </button>
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm ${
                      selectedCategory === category.id ? 'bg-[#F0F0FF] text-[#6366F1] font-medium' : 'hover:bg-[#F0F0FF]/50 text-[#333]'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card-elegant p-5 bg-[#F0F0FF]">
              <Lightbulb className="h-8 w-8 text-[#6366F1] mb-3" />
              <h3 className="text-base font-semibold text-[#333]">如何交换技能？</h3>
              <div className="mt-3 text-sm text-[#888] space-y-2">
                <p>1. 发布你能教的技能</p>
                <p>2. 说明你想学的技能</p>
                <p>3. 等待匹配或主动寻找</p>
                <p>4. 双方确认开始交换</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="exchange" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="exchange">技能互换</TabsTrigger>
                <TabsTrigger value="teach">我能教</TabsTrigger>
                <TabsTrigger value="learn">我想学</TabsTrigger>
              </TabsList>

              <TabsContent value="exchange" className="space-y-4">
                {filteredSkills.length > 0 ? (
                  <div className="grid gap-4">
                    {filteredSkills.map((skill) => (
                      <SkillExchangeCard key={skill.id} skill={skill} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 card-elegant">
                    <div className="w-16 h-16 bg-[#F0F0FF] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-[#888]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#333]">没有找到相关技能</h3>
                    <p className="text-sm text-[#888] mt-1">试试其他关键词或分类</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="teach">
                <div className="text-center py-20 card-elegant">
                  <Lightbulb className="h-16 w-16 text-[#6366F1]/20 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#333]">浏览能教的技能</h3>
                  <p className="text-sm text-[#888] mt-1">这里展示大家能教的技能列表</p>
                </div>
              </TabsContent>

              <TabsContent value="learn">
                <div className="text-center py-20 card-elegant">
                  <Lightbulb className="h-16 w-16 text-[#6366F1]/20 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#333]">浏览想学的技能</h3>
                  <p className="text-sm text-[#888] mt-1">这里展示大家想学的技能列表</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillExchangeCard({ skill }: { skill: any }) {
  const levelLabels: Record<string, string> = {
    BEGINNER: "入门",
    INTERMEDIATE: "中级",
    ADVANCED: "高级",
    EXPERT: "专家",
  }

  return (
    <div className="card-elegant p-6">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* User Info */}
        <div className="flex items-center gap-3 md:w-48">
          <Avatar className="h-12 w-12">
            <AvatarImage src={skill.user.avatar} />
            <AvatarFallback className="bg-[#F0F0FF] text-[#6366F1]">
              {skill.user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-[#333]">{skill.user.name}</p>
            <p className="text-xs text-[#888]">{skill.location}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full sm:w-auto">
            <p className="text-xs text-[#888] mb-1">我能教</p>
            <div className="flex items-center gap-2">
              <span className="tag-elegant">
                {skill.teach.name}
              </span>
              {skill.teach.level && (
                <Badge variant="outline" className="text-xs text-[#888]">
                  {levelLabels[skill.teach.level]}
                </Badge>
              )}
            </div>
          </div>

          <ArrowRight className="h-5 w-5 text-[#888] hidden sm:block" />
          <div className="sm:hidden text-[#888]">⇅</div>

          <div className="flex-1 w-full sm:w-auto">
            <p className="text-xs text-[#888] mb-1">我想学</p>
            <span className="tag-elegant" style={{ backgroundColor: '#6366F1', color: '#F0F0FF' }}>
              {skill.learn.name}
            </span>
          </div>
        </div>

        {/* Action */}
        <button className="btn-primary">
          发起交换
        </button>
      </div>

      {skill.description && (
        <>
          <div className="divider-light mt-4" />
          <p className="mt-4 text-sm text-[#888]">
            {skill.description}
          </p>
        </>
      )}
    </div>
  )
}
