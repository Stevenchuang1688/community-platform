"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  Filter,
  Plus,
  Minus,
  ShoppingBag,
  Tag,
  TrendingUp,
  Zap,
} from "lucide-react"

const categories = [
  { id: "all", name: "全部", icon: ShoppingBag },
  { id: "course", name: "课程", icon: Tag },
  { id: "tool", name: "工具", icon: Zap },
  { id: "service", name: "服务", icon: TrendingUp },
  { id: "material", name: "资料", icon: ShoppingBag },
]

const products = [
  {
    id: "1",
    title: "社群运营实战手册",
    description: "从0到1搭建高活跃社群，包含50+运营模板和案例",
    images: [] as string[],
    price: 99,
    originalPrice: 199,
    stock: 500,
    sales: 326,
    category: "course",
    tags: ["社群运营", "实战"],
    seller: { name: "运营学院", avatar: "" },
    rating: 4.9,
  },
  {
    id: "2",
    title: "活动策划工具包",
    description: "活动策划全流程工具，包含签到、报名、反馈模板",
    images: [] as string[],
    price: 49,
    originalPrice: 99,
    stock: 1000,
    sales: 512,
    category: "tool",
    tags: ["活动策划", "模板"],
    seller: { name: "效率工坊", avatar: "" },
    rating: 4.8,
  },
  {
    id: "3",
    title: "1对1品牌咨询",
    description: "资深品牌顾问1小时深度咨询，帮你找到差异化定位",
    images: [] as string[],
    price: 299,
    originalPrice: 499,
    stock: 10,
    sales: 67,
    category: "service",
    tags: ["品牌", "咨询"],
    seller: { name: "品牌战略师", avatar: "" },
    rating: 5.0,
  },
  {
    id: "4",
    title: "主理人成长课",
    description: "12节视频课程，从社群小白到优秀主理人",
    images: [] as string[],
    price: 199,
    originalPrice: 399,
    stock: 999,
    sales: 289,
    category: "course",
    tags: ["主理人", "成长"],
    seller: { name: "Steven", avatar: "" },
    rating: 4.9,
  },
  {
    id: "5",
    title: "小红书运营资料包",
    description: "爆款标题模板、选题库、数据分析表一网打尽",
    images: [] as string[],
    price: 39,
    originalPrice: 79,
    stock: 2000,
    sales: 1024,
    category: "material",
    tags: ["小红书", "运营"],
    seller: { name: "内容研究所", avatar: "" },
    rating: 4.7,
  },
  {
    id: "6",
    title: "私域流量搭建指南",
    description: "从引流到转化，系统化搭建私域流量池",
    images: [] as string[],
    price: 69,
    originalPrice: 129,
    stock: 800,
    sales: 456,
    category: "course",
    tags: ["私域", "流量"],
    seller: { name: "流量学院", avatar: "" },
    rating: 4.8,
  },
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = activeCategory === "all" || product.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="container px-4 md:px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">精选商城</h1>
              <p className="text-pink-100 mt-1">为主理人精选的工具、课程和服务</p>
            </div>
            <Link href="/cart">
              <Button variant="secondary" className="text-pink-600">
                <ShoppingCart className="mr-2 h-4 w-4" />
                购物车
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-8">
        {/* Banner */}
        <Card className="mb-8 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200 overflow-hidden">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <Badge className="mb-2 bg-pink-100 text-pink-700 hover:bg-pink-100">限时特惠</Badge>
              <h2 className="text-2xl font-bold mb-2">新用户专享</h2>
              <p className="text-muted-foreground">首次购买任意商品享受8折优惠，使用优惠码: <span className="font-mono font-bold text-pink-600">NEW2026</span></p>
            </div>
            <div className="text-6xl">🎁</div>
          </CardContent>
        </Card>

        {/* Search & Categories */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索商品..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold">没有找到相关商品</h3>
            <p className="text-muted-foreground mt-1">试试其他关键词</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/shop/product/${product.id}`}>
        <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group h-full">
          {/* Image */}
          <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 relative overflow-hidden">
            {product.images[0] ? (
              <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-pink-200" />
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-red-500 text-white border-0">-{discount}%</Badge>
              </div>
            )}
            <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
            </button>
          </div>

          {/* Info */}
          <CardContent className="p-4">
            <h3 className="font-semibold line-clamp-2 group-hover:text-pink-600 transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{product.description}</p>

            <div className="flex items-center gap-1 mt-2">
              {product.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
              ))}
            </div>

            <div className="flex items-end justify-between mt-3">
              <div>
                <span className="text-xl font-bold text-pink-600">¥{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through ml-2">¥{product.originalPrice}</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                <Star className="h-3.5 w-3.5 fill-current" />
                {product.rating}
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-xs bg-pink-100 text-pink-700">
                    {product.seller.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{product.seller.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">已售 {product.sales}</span>
            </div>
          </CardContent>
        </Card>
    </Link>
  )
}
