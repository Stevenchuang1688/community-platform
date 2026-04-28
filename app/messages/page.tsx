"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  MessageCircle,
  Send,
  Search,
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Image as ImageIcon,
  Paperclip,
} from "lucide-react"

// 模拟会话列表
const conversations = [
  {
    id: "1",
    user: { name: "设计师阿杰", avatar: "" },
    lastMessage: "好的，那我们约个时间聊聊设计的事",
    time: "刚刚",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    user: { name: "运营达人", avatar: "" },
    lastMessage: "活动策划方案发你邮箱了，请查收",
    time: "10分钟前",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    user: { name: "程序员小李", avatar: "" },
    lastMessage: "Python技能互换的事，你考虑得怎么样？",
    time: "1小时前",
    unread: 1,
    online: false,
  },
  {
    id: "4",
    user: { name: "瑜伽教练Lisa", avatar: "" },
    lastMessage: "下次瑜伽课什么时候？想报名",
    time: "昨天",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    user: { name: "烘焙师小美", avatar: "" },
    lastMessage: "法式甜点教程已经准备好了",
    time: "2天前",
    unread: 0,
    online: false,
  },
]

// 模拟聊天记录
const chatMessages = [
  { id: "1", sender: "other", content: "嗨，我看到你在社群主理人平台上发布的活动了，很有意思！", time: "14:20" },
  { id: "2", sender: "me", content: "谢谢！我们正在筹备下一期的主理人交流局", time: "14:22" },
  { id: "3", sender: "other", content: "太好了！我想参与，可以帮你做活动海报设计", time: "14:25" },
  { id: "4", sender: "me", content: "那太好了！我们正好缺一个设计师", time: "14:26" },
  { id: "5", sender: "other", content: "好的，那我们约个时间聊聊设计的事", time: "14:30" },
]

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>("1")
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobile, setShowMobile] = useState(false)

  const filteredConversations = conversations.filter((c) =>
    c.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeConversation = conversations.find((c) => c.id === selectedChat)

  return (
    <div className="min-h-screen bg-gradient-elegant">
      <div className="container-elegant section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 h-[calc(100vh-10rem)] rounded-xl overflow-hidden border bg-white shadow-sm">
          {/* 会话列表 */}
          <div className={`md:col-span-1 border-r ${showMobile ? 'hidden md:block' : ''}`}>
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-base text-[#333]">消息</h2>
                <span className="tag-elegant text-[10px]">{conversations.filter((c) => c.unread > 0).length}</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
                <Input
                  placeholder="搜索联系人..."
                  className="pl-10 input-elegant"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100%-7rem)]">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    setSelectedChat(conv.id)
                    setShowMobile(true)
                  }}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-[#F0F0FF]/50 transition-colors text-left ${
                    selectedChat === conv.id ? "bg-[#F0F0FF]" : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-[#F0F0FF] text-[#6366F1]">{conv.user.name[0]}</AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-[#333]">{conv.user.name}</span>
                      <span className="text-xs text-[#888]">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-sm text-[#888] truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="ml-2 bg-[#6366F1] text-white text-xs h-5 min-w-[1.25rem] flex items-center justify-center rounded-full px-1">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 聊天区域 */}
          <div className={`md:col-span-2 flex flex-col ${!showMobile ? 'hidden md:flex' : ''}`}>
            {activeConversation ? (
              <>
                {/* 聊天头部 */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setShowMobile(false)} className="md:hidden">
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-[#F0F0FF] text-[#6366F1] text-sm">
                        {activeConversation.user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm text-[#333]">{activeConversation.user.name}</p>
                      <p className="text-xs text-green-600">{activeConversation.online ? "在线" : "离线"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* 消息列表 */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[70%] ${msg.sender === "me" ? "order-2" : ""}`}>
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm ${
                            msg.sender === "me"
                              ? "bg-[#6366F1] text-white rounded-br-md"
                              : "bg-[#F0F0FF] text-[#333] rounded-bl-md"
                          }`}
                        >
                          {msg.content}
                        </div>
                        <p className={`text-xs text-[#888] mt-1 ${msg.sender === "me" ? "text-right" : ""}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 输入区域 */}
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="输入消息..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 input-elegant"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && message.trim()) {
                          setMessage("")
                        }
                      }}
                    />
                    <button
                      className="btn-primary h-9 w-9 !px-0 shrink-0"
                      disabled={!message.trim()}
                      onClick={() => setMessage("")}
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-[#6366F1]/15 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#888]">选择一个会话开始聊天</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
