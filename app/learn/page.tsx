"use client"

import { BookOpen, Users, PlayCircle, FileText, MessageCircle } from "lucide-react"
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
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
        <div className="container px-4 md:px-6 py-12">
          <h1 className="text-3xl font-bold">学习专区</h1>
          <p className="text-blue-100 mt-1">知识分享，共同成长</p>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={BookOpen} label="精品课程" value="24" />
          <StatCard icon={Users} label="学习小组" value="56" />
          <StatCard icon={PlayCircle} label="视频资源" value="128" />
          <StatCard icon={FileText} label="学习资料" value="512" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">精品课程</h2>
              <Button variant="outline" size="sm">查看全部</Button>
            </div>
            <div className="grid gap-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>

          {/* Study Groups */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">学习小组</h2>
              <Button variant="outline" size="sm">全部</Button>
            </div>
            <div className="space-y-4">
              {studyGroups.map((group) => (
                <StudyGroupCard key={group.id} group={group} />
              ))}
            </div>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">创建学习小组</CardTitle>
                <CardDescription>发起一个学习主题，找到志同道合的伙伴</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  <Users className="mr-2 h-4 w-4" />
                  创建小组
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function CourseCard({ course }: { course: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 h-32 sm:h-auto bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
          <PlayCircle className="h-12 w-12 text-blue-300" />
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">{course.category}</Badge>
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={course.instructor.avatar} />
                <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                  {course.instructor.name[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{course.students} 人在学</span>
              <span>{course.lessons} 节课</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function StudyGroupCard({ group }: { group: any }) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="outline" className="mb-2">{group.category}</Badge>
            <h3 className="font-semibold">{group.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {group.members}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
