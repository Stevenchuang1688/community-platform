import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 开始种子数据...')

  // 1. 创建管理员用户
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@qmlx.club' },
    update: {},
    create: {
      email: 'admin@qmlx.club',
      name: '管理员',
      password: adminPassword,
      role: 'ADMIN',
      bio: '谦懋乐享潮汕社群联盟管理员',
      profile: { create: { location: '深圳', occupation: '社群运营' } },
    },
  })
  console.log(`✅ 管理员: ${admin.email} (密码: admin123)`)

  // 2. 创建测试主理人
  const orgPassword = await bcrypt.hash('organizer123', 10)
  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@qmlx.club' },
    update: {},
    create: {
      email: 'organizer@qmlx.club',
      name: 'Steven Chuang',
      password: orgPassword,
      role: 'ORGANIZER',
      bio: '88年潮汕人 | 摩羯座 | 20+年连续创业者\nTCC潮汕社群大会发起人\n屿见社创空间创始人',
      profile: { create: { location: '深圳', occupation: '社群运营顾问', wechat: 'qmlx2024' } },
    },
  })
  console.log(`✅ 主理人: ${organizer.email} (密码: organizer123)`)

  // 3. 创建测试用户
  const userPassword = await bcrypt.hash('user123', 10)
  const testUser = await prisma.user.upsert({
    where: { email: 'test@qmlx.club' },
    update: {},
    create: {
      email: 'test@qmlx.club',
      name: '测试用户',
      password: userPassword,
      role: 'USER',
      bio: '潮汕社群爱好者',
      profile: { create: { location: '汕头', occupation: '设计师' } },
    },
  })
  console.log(`✅ 测试用户: ${testUser.email} (密码: user123)`)

  // 4. 创建技能
  const skillNames = [
    { name: '社群运营', category: 'BUSINESS', icon: '👥' },
    { name: 'Python编程', category: 'TECH', icon: '🐍' },
    { name: 'UI设计', category: 'DESIGN', icon: '🎨' },
    { name: '摄影', category: 'ART', icon: '📷' },
    { name: '英语', category: 'LANGUAGE', icon: '🇬🇧' },
    { name: '烘焙', category: 'LIFESTYLE', icon: '🧁' },
    { name: '瑜伽', category: 'SPORTS', icon: '🧘' },
    { name: '活动策划', category: 'BUSINESS', icon: '📋' },
    { name: '视频剪辑', category: 'TECH', icon: '🎬' },
    { name: '书法', category: 'ART', icon: '✒️' },
  ]

  for (const s of skillNames) {
    await prisma.skill.upsert({
      where: { name: s.name },
      update: {},
      create: { name: s.name, category: s.category as any, icon: s.icon },
    })
  }
  console.log(`✅ ${skillNames.length} 个技能`)

  // 5. 创建商品分类
  const categories = [
    { name: '课程', icon: '📚', sort: 1 },
    { name: '工具', icon: '🛠️', sort: 2 },
    { name: '服务', icon: '💼', sort: 3 },
    { name: '资料', icon: '📄', sort: 4 },
    { name: '文创', icon: '🎨', sort: 5 },
  ]

  for (const cat of categories) {
    await prisma.productCategory.upsert({
      where: { id: cat.name },
      update: {},
      create: { id: cat.name, name: cat.name, icon: cat.icon, sort: cat.sort },
    })
  }
  console.log(`✅ ${categories.length} 个商品分类`)

  // 6. 创建示例活动
  const activities = [
    { title: '周末桌游社交局', description: '欢迎喜欢桌游的朋友一起来玩，新手友好！提供茶饮小食，畅玩一下午。', type: 'OFFLINE', status: 'PUBLISHED', location: '深圳市南山区' },
    { title: 'AI绘画入门分享会', description: '从零开始学习 Midjourney 和 Stable Diffusion，带你进入AI创作新世界。', type: 'ONLINE', status: 'PUBLISHED', onlineUrl: 'https://meeting.tencent.com' },
    { title: '创业者下午茶', description: '轻松聊聊创业路上的故事和经验，互相启发，共同成长。', type: 'OFFLINE', status: 'PUBLISHED', location: '深圳市福田区' },
  ]

  for (const act of activities) {
    const existing = await prisma.activity.findFirst({ where: { title: act.title } })
    if (!existing) {
      await prisma.activity.create({
        data: {
          ...act,
          startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 一周后
          maxParticipants: act.type === 'ONLINE' ? 100 : 12,
          organizerId: organizer.id,
        },
      })
    }
  }
  console.log(`✅ ${activities.length} 个示例活动`)

  // 7. 创建示例商品
  const products = [
    { title: '社群运营实战手册', description: '从0到1搭建社群的完整方法论', price: 99, stock: 999, categoryId: '课程' },
    { title: '活动策划工具包', description: '活动策划全流程模板+工具', price: 49, stock: 999, categoryId: '工具' },
    { title: '主理人成长课', description: '社群主理人必备的成长课程', price: 199, stock: 500, categoryId: '课程' },
  ]

  for (const prod of products) {
    const existing = await prisma.product.findFirst({ where: { title: prod.title } })
    if (!existing) {
      await prisma.product.create({
        data: {
          ...prod,
          originalPrice: prod.price * 1.3,
          sellerId: organizer.id,
          tags: ['社群', '运营'],
        },
      })
    }
  }
  console.log(`✅ ${products.length} 个示例商品`)

  console.log('\n🎉 种子数据完成！')
  console.log('\n测试账号：')
  console.log('  管理员: admin@qmlx.club / admin123')
  console.log('  主理人: organizer@qmlx.club / organizer123')
  console.log('  用户:   test@qmlx.club / user123')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
