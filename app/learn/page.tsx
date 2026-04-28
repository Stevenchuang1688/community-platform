"use client"

import { BookOpen, Users, PlayCircle, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const courses = [
  {
    id: "1",
    title: "社群运营从0到1",
    description: "如何建立和运营一个高质量的社群",
    instructor: { name: "Steven", avatar: "" },
    students: 156,
    lessons: 12,
    category: "运营",
    image: "",
  },
  {
    id: "2",
    title: "活动策划实战课",
    description: "从策划到执行，打造精彩活动",
    instructor: { name: "活动策划师", avatar: "" },
    students: 89,
    lessons: 8,
    category: "策划",
    image: "",
  },
]

const studyGroups = [
  {
    id: "1",
    name: "早起读书打卡群",
    members: 128,
    category: "读书",
    description: "每天早起阅读30分钟，分享读书心得",
  },
  {
    id: "2",
    name: "英语学习互助组",
    members: 256,
    category: "语言",
    description: "一起练习英语口语，互相纠正发音",
  },
]

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-elegant">
      {/* Header */}
      <div className="bg-[#6366F1] text-white">
        <div className="container-elegant py-12">
          <h1 className="text-2xl font-bold">学习专区</h1>
          <p className="text-[#F0F0FF]/80 mt-1 text-sm">知识分享，共同成长</p>
        </div>
      </div>

      <div className="container-elegant section-spacing">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard icon={BookOpen} label="精品课程" value="24" />
          <StatCard icon={Users} label="学习小组" value="56" />
          <StatCard icon={PlayCircle} label="视频资源" value="128" />
          <StatCard icon={FileText} label="学习资料" value="512" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Courses */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#333]">精品课程</h2>
              <button className="btn-secondary text-xs">查看全部</button>
            </div>
            <div className="grid gap-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Study Groups */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#333]">学习小组</h2>
              <button className="btn-secondary text-xs">全部</button>
            </div>
            <div className="space-y-4">
              {studyGroups.map((group) => (
                <StudyGroupCard key={group.id} group={group} />
              ))}
            </div>

            <div className="card-elegant p-5 bg-[#F0F0FF]">
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-base font-semibold text-[#333]">创建学习小组</CardTitle>
                <CardDescription className="text-sm text-[#888]">发起一个学习主题，找到志同道合的伙伴</CardDescription>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <button className="btn-primary w-full">
                  <Users className="mr-2 h-4 w-4" />
                  创建小组
                </button>
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

function CourseCard({ course }: { course: any }) {
  return (
    <div className="card-elegant overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 h-32 sm:h-auto bg-[#F0F0FF] flex items-center justify-center">
          <PlayCircle className="h-12 w-12 text-[#6366F1]/20" />
        </div>
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="tag-elegant mb-2 inline-block">{course.category}</span>
              <h3 className="font-semibold text-base text-[#333]">{course.title}</h3>
              <p className="text-sm text-[#888] mt-1">{course.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={course.instructor.avatar} />
                <AvatarFallback className="text-xs bg-[#F0F0FF] text-[#6366F1]">
                  {course.instructor.name[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-[#888]">{course.instructor.name}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#888]">
              <span>{course.students} 人在学</span>
              <span>{course.lessons} 节课</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StudyGroupCard({ group }: { group: any }) {
  return (
    <div className="card-elegant p-4 cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <span className="tag-elegant mb-2 inline-block">{group.category}</span>
          <h3 className="font-semibold text-sm text-[#333]">{group.name}</h3>
          <p className="text-sm text-[#888] mt-1">{group.description}</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-[#888]">
          <Users className="h-4 w-4" />
          {group.members}
        </div>
      </div>
    </div>
  )
}
