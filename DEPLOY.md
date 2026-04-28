# 社群主理人平台 - EdgeOne Pages 部署指南

## 前置准备

### 1. GitHub 仓库（已完成 ✅）

代码已推送至：https://github.com/Stevenchuang1688/community-platform

### 2. 创建 Neon 云数据库（免费）

1. 访问 https://console.neon.tech 注册/登录
2. 点击 **「Create Project」** → 项目名填 `community-platform` → 选择区域 **Singapore**
3. 创建后，在 Dashboard 页面复制 **Connection string**
4. 格式：`postgresql://username:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`

> 💡 Neon 免费版提供 0.5GB 存储，完全够用

---

## 方式一：GitHub + EdgeOne 控制台（推荐）

### 步骤 1：EdgeOne Pages 创建项目

1. 访问 **https://console.tencentcloud.com/edgeone/pages**
2. 点击 **「创建项目」** → 选择 **「导入 Git 仓库」**
3. 授权 GitHub → 选择 `Stevenchuang1688/community-platform`
4. 构建配置自动读取 `edgeone.json`，无需修改

### 步骤 2：配置环境变量

在 **项目设置 → 环境变量** 中添加以下 3 个变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `DATABASE_URL` | `postgresql://...neon.tech/neondb?sslmode=require` | Neon 数据库连接串 |
| `NEXTAUTH_SECRET` | `OQ6xF0GUPgY83Gr8iw8SiCe2rLkAItPybmwy0hRGPiQ=` | 已生成的认证密钥 |
| `NEXTAUTH_URL` | `https://你的EdgeOne域名` | 部署后在概览页查看 |

### 步骤 3：执行数据库迁移

本地执行（需有 Node.js 环境）：

```bash
# 设置 Neon 连接串
export DATABASE_URL="你的Neon连接串"

# 生成 Prisma Client 并迁移
cd community-platform
npx prisma generate
npx prisma migrate deploy
```

### 步骤 4：部署

点击 EdgeOne Pages 的 **「重新部署」**，等待构建完成。

### 步骤 5：更新 NEXTAUTH_URL

部署成功后，复制 EdgeOne 分配的域名，回 **环境变量** 更新 `NEXTAUTH_URL`，再重新部署一次。

---

## 方式二：EdgeOne CLI 部署

```bash
# 安装并登录
npm install -g edgeone
edgeone login -s global

# 部署
cd community-platform
edgeone pages deploy -n community-platform -e production

# 配置环境变量
edgeone pages env add DATABASE_URL "你的Neon连接串"
edgeone pages env add NEXTAUTH_SECRET "OQ6xF0GUPgY83Gr8iw8SiCe2rLkAItPybmwy0hRGPiQ="
edgeone pages env add NEXTAUTH_URL "https://你的域名"
```

---

## 方式三：Pages Drop 拖放上传

1. 访问 **https://pages.edgeone.ai/zh/drop**
2. 将项目文件夹拖放到上传区域
3. 设置域名，点击部署

---

## 数据库方案对比

| 方案 | 费用 | 优点 | 缺点 |
|------|------|------|------|
| **Neon**（推荐） | 免费 | Serverless、自动休眠、即开即用 | 海外节点，国内延迟稍高 |
| 腾讯云 PostgreSQL | 付费（~50元/月起） | 国内低延迟、与 EdgeOne 同生态 | 需付费 |
| Supabase | 免费 | PostgreSQL + Auth + 存储一体化 | 海外节点 |

> 💡 先用 Neon 免费部署，验证没问题后再切换到腾讯云 PostgreSQL 降低延迟

---

## 切换到腾讯云 PostgreSQL

如需从 Neon 切换到腾讯云 PostgreSQL：

1. 在腾讯云控制台创建 PostgreSQL 实例（选择广州区域）
2. 获取外网连接地址
3. 本地执行迁移：
   ```bash
   export DATABASE_URL="腾讯云连接串"
   npx prisma migrate deploy
   ```
4. 更新 EdgeOne 环境变量中的 `DATABASE_URL`
5. 重新部署

---

## 自定义域名

1. 在 EdgeOne Pages 控制台 → **域名管理**
2. 添加自定义域名（如 `shequ.yujian.space`）
3. 在域名 DNS 添加 **CNAME** 记录指向 EdgeOne 分配的域名
4. 如使用中国大陆加速区域，域名需完成 **ICP 备案**

---

## 部署后验证清单

- [ ] 首页正常加载
- [ ] `/login` 登录页可访问
- [ ] `/register` 注册功能正常
- [ ] `/api/health` 健康检查返回 `{"status":"ok"}`
- [ ] 数据库连接正常（注册用户能写入）
- [ ] 活动页、技能互换页、商城页正常
- [ ] 管理后台 `/admin` 可访问

---

## 项目关键文件

```
community-platform/
├── edgeone.json                  # EdgeOne Pages 构建配置
├── .env.production.example       # 生产环境变量模板
├── scripts/migrate.sh            # 数据库迁移脚本
├── prisma/schema.prisma          # 数据库 Schema（20+ 表）
├── docker-compose.yml            # 本地开发 Docker
├── app/api/health/route.ts       # 健康检查 API
└── ...
```
