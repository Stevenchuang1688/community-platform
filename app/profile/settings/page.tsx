"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Save, Camera, MapPin, LinkIcon, Phone, Mail } from "lucide-react"

export default function ProfileSettingsPage() {
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container px-4 md:px-6 py-8 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">编辑资料</h1>
        </div>

        <div className="space-y-6">
          {/* 头像 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-orange-400 to-red-500 text-white">S</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Steven Chuang</h3>
                  <p className="text-sm text-muted-foreground">支持 JPG、PNG 格式，大小不超过 2MB</p>
                  <Button variant="outline" size="sm" className="mt-2">更换头像</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">基本信息</CardTitle>
              <CardDescription>修改你的个人资料</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">昵称</Label>
                  <Input id="name" defaultValue="Steven Chuang" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">手机号</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" className="pl-10" defaultValue="138****8888" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" className="pl-10" defaultValue="steven@yujian.space" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">个人简介</Label>
                <textarea
                  id="bio"
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue="88年潮汕人 | 摩羯座 | 20+年连续创业者&#10;TCC潮汕社群大会发起人&#10;屿见社创空间创始人"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">所在城市</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="location" className="pl-10" defaultValue="深圳" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">个人网站</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="website" className="pl-10" defaultValue="https://yujian.space" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 社交账号 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">社交账号</CardTitle>
              <CardDescription>绑定你的社交账号</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>微信号</Label>
                  <Input defaultValue="steven_chuang" />
                </div>
                <div className="space-y-2">
                  <Label>微博</Label>
                  <Input placeholder="输入微博ID" />
                </div>
                <div className="space-y-2">
                  <Label>GitHub</Label>
                  <Input placeholder="输入GitHub用户名" />
                </div>
                <div className="space-y-2">
                  <Label>小红书</Label>
                  <Input placeholder="输入小红书号" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 兴趣标签 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">兴趣标签</CardTitle>
              <CardDescription>添加你的兴趣标签，帮助别人了解你</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {["社群运营", "创业", "潮汕文化", "活动策划", "品牌设计"].map((tag) => (
                  <Badge key={tag} variant="secondary" className="py-1.5 px-3 cursor-pointer hover:bg-red-100 hover:text-red-600">
                    {tag} ×
                  </Badge>
                ))}
                <Badge variant="outline" className="py-1.5 px-3 cursor-pointer hover:bg-orange-50">
                  + 添加标签
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 保存按钮 */}
          <div className="flex justify-end gap-3">
            <Link href="/profile">
              <Button variant="outline">取消</Button>
            </Link>
            <Button onClick={handleSave} disabled={saving} className="bg-gradient-to-r from-orange-500 to-red-500">
              <Save className="mr-2 h-4 w-4" />
              {saving ? "保存中..." : "保存修改"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
