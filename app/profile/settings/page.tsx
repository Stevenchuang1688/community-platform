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
    <div className="min-h-screen bg-gradient-elegant">
      <div className="container-elegant section-spacing max-w-3xl">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-[#333]">编辑资料</h1>
        </div>

        <div className="space-y-8">
          {/* 头像 */}
          <div className="card-elegant p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-[#6366F1] text-white">S</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#6366F1] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#4F46E5] transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-base text-[#333]">Steven Chuang</h3>
                <p className="text-sm text-[#888]">支持 JPG、PNG 格式，大小不超过 2MB</p>
                <button className="btn-secondary text-xs mt-2">更换头像</button>
              </div>
            </div>
          </div>

          {/* 基本信息 */}
          <div className="card-elegant">
            <div className="p-5 pb-3">
              <h3 className="text-base font-semibold text-[#333]">基本信息</h3>
              <p className="text-sm text-[#888]">修改你的个人资料</p>
            </div>
            <div className="px-5 pb-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-[#333]">昵称</Label>
                  <Input id="name" defaultValue="Steven Chuang" className="input-elegant" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm text-[#333]">手机号</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                    <Input id="phone" className="pl-10 input-elegant" defaultValue="138****8888" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-[#333]">邮箱</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                  <Input id="email" type="email" className="pl-10 input-elegant" defaultValue="steven@yujian.space" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm text-[#333]">个人简介</Label>
                <textarea
                  id="bio"
                  className="input-elegant min-h-[100px]"
                  defaultValue="88年潮汕人 | 摩羯座 | 20+年连续创业者&#10;TCC潮汕社群大会发起人&#10;屿见社创空间创始人"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm text-[#333]">所在城市</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                    <Input id="location" className="pl-10 input-elegant" defaultValue="深圳" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm text-[#333]">个人网站</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                    <Input id="website" className="pl-10 input-elegant" defaultValue="https://yujian.space" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 社交账号 */}
          <div className="card-elegant">
            <div className="p-5 pb-3">
              <h3 className="text-base font-semibold text-[#333]">社交账号</h3>
              <p className="text-sm text-[#888]">绑定你的社交账号</p>
            </div>
            <div className="px-5 pb-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-[#333]">微信号</Label>
                  <Input defaultValue="steven_chuang" className="input-elegant" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-[#333]">微博</Label>
                  <Input placeholder="输入微博ID" className="input-elegant" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-[#333]">GitHub</Label>
                  <Input placeholder="输入GitHub用户名" className="input-elegant" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-[#333]">小红书</Label>
                  <Input placeholder="输入小红书号" className="input-elegant" />
                </div>
              </div>
            </div>
          </div>

          {/* 兴趣标签 */}
          <div className="card-elegant">
            <div className="p-5 pb-3">
              <h3 className="text-base font-semibold text-[#333]">兴趣标签</h3>
              <p className="text-sm text-[#888]">添加你的兴趣标签，帮助别人了解你</p>
            </div>
            <div className="px-5 pb-5">
              <div className="flex flex-wrap gap-2 mb-4">
                {["社群运营", "创业", "潮汕文化", "活动策划", "品牌设计"].map((tag) => (
                  <span key={tag} className="tag-elegant cursor-pointer hover:opacity-70">
                    {tag} ×
                  </span>
                ))}
                <span className="tag-elegant cursor-pointer hover:opacity-70" style={{ backgroundColor: 'transparent', border: '1px dashed #6366F1' }}>
                  + 添加标签
                </span>
              </div>
            </div>
          </div>

          {/* 保存按钮 */}
          <div className="flex justify-end gap-3 pb-8">
            <Link href="/profile">
              <button className="btn-secondary">取消</button>
            </Link>
            <button onClick={handleSave} disabled={saving} className="btn-primary">
              <Save className="mr-2 h-4 w-4" />
              {saving ? "保存中..." : "保存修改"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
