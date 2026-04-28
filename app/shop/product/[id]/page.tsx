"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ShoppingCart,
  Heart,
  Star,
  Minus,
  Plus,
  Share2,
  Shield,
  Truck,
  RotateCcw,
  CheckCircle2,
  MessageCircle,
} from "lucide-react"

// 模拟商品详情
const product = {
  id: "1",
  title: "社群运营实战手册",
  description: "从0到1搭建高活跃社群，包含50+运营模板和案例。本手册涵盖了社群定位、内容策划、活动运营、用户增长、变现模式等全方位内容，适合社群运营新手和想提升运营能力的主理人。",
  images: [] as string[],
  price: 99,
  originalPrice: 199,
  stock: 500,
  sales: 326,
  category: "课程",
  tags: ["社群运营", "实战", "模板"],
  seller: { name: "运营学院", avatar: "", bio: "专注社群运营教育，已帮助1000+主理人成长" },
  rating: 4.9,
  reviews: 128,
  features: [
    "50+ 可复用运营模板",
    "20+ 真实社群案例分析",
    "社群定位与搭建全流程",
    "内容策划与排期方法",
    "活动运营SOP",
    "用户增长与留存策略",
    "社群变现模式详解",
  ],
}

const reviews = [
  { user: "小陈", rating: 5, content: "非常实用！模板拿来就能用，省了很多时间", date: "3天前" },
  { user: "阿花", rating: 5, content: "案例分析很到位，学到了很多运营技巧", date: "1周前" },
  { user: "老王", rating: 4, content: "内容丰富，就是有些地方可以再详细点", date: "2周前" },
]

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("detail")
  const [addedToCart, setAddedToCart] = useState(false)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    // 模拟加入购物车
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    // 跳转结算页
    window.location.href = `/checkout?product=${product.id}&qty=${quantity}`
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container px-4 md:px-6 py-8">
        {/* 面包屑 */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/shop" className="hover:text-foreground">商城</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.category}</span>
          <span className="mx-2">/</span>
          <span>{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：商品图片 */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {product.images[0] ? (
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4">📚</div>
                  <p className="text-pink-300">{product.title}</p>
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-500 text-white border-0 text-lg px-3 py-1">-{discount}%</Badge>
                </div>
              )}
            </div>
          </div>

          {/* 右侧：商品信息 */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
              <p className="text-muted-foreground mt-2">{product.description}</p>
            </div>

            {/* 价格 */}
            <div className="bg-pink-50 rounded-xl p-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-pink-600">¥{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">¥{product.originalPrice}</span>
                )}
                {discount > 0 && (
                  <Badge className="bg-red-100 text-red-600 border-0">省 ¥{product.originalPrice! - product.price}</Badge>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>已售 {product.sales}</span>
                <span>库存 {product.stock}</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  {product.rating} ({product.reviews}评价)
                </div>
              </div>
            </div>

            {/* 卖家信息 */}
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl border">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-pink-100 text-pink-700">{product.seller.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{product.seller.name}</p>
                <p className="text-sm text-muted-foreground">{product.seller.bio}</p>
              </div>
              <Button variant="outline" size="sm">关注</Button>
            </div>

            {/* 数量选择 */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">数量</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-l-lg"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 h-10 flex items-center justify-center border-x font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-r-lg"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-muted-foreground">小计: <span className="text-pink-600 font-bold">¥{(product.price * quantity).toFixed(2)}</span></span>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <Button
                className="flex-1 h-12 text-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                onClick={handleBuyNow}
              >
                立即购买
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-12 text-lg border-pink-300 text-pink-600 hover:bg-pink-50"
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <><CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />已加入购物车</>
                ) : (
                  <><ShoppingCart className="mr-2 h-5 w-5" />加入购物车</>
                )}
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* 服务保障 */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-xl border">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-green-500" />
                <span>正品保障</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-blue-500" />
                <span>极速发货</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-4 w-4 text-orange-500" />
                <span>7天退款</span>
              </div>
            </div>
          </div>
        </div>

        {/* 商品详情/评价 Tabs */}
        <div className="mt-12">
          <div className="flex gap-6 border-b mb-6">
            <button
              onClick={() => setActiveTab("detail")}
              className={`pb-3 text-lg font-medium border-b-2 transition-colors ${activeTab === "detail" ? "border-pink-500 text-pink-600" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              商品详情
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-lg font-medium border-b-2 transition-colors ${activeTab === "reviews" ? "border-pink-500 text-pink-600" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              用户评价 ({product.reviews})
            </button>
          </div>

          {activeTab === "detail" ? (
            <Card>
              <CardHeader>
                <CardTitle>课程内容包含</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-pink-100 text-pink-700">{review.user[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{review.user}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'text-amber-500 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-sm">{review.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
