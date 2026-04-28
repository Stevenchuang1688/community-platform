# 社群主理人平台 - EdgeOne Pages 部署指南

## 方式一：GitHub 仓库导入（推荐）

### 步骤 1：推送代码到 GitHub

```bash
cd /workspace/community-platform

# 1. 创建 GitHub 仓库
gh repo create community-platform --public --source=. --push

# 或手动操作：
# a. 在 github.com 创建新仓库 community-platform
# b. 添加远程仓库并推送
git remote add origin https://github.com/YOUR_USERNAME/community-platform.git
git push -u origin master
```

### 步骤 2：在 EdgeOne Pages 控制台导入

1. 访问 **https://console.tencentcloud.com/edgeone/pages**
2. 点击 **「创建项目」** → 选择 **「导入 Git 仓库」**
3. 授权 GitHub 并选择 `community-platform` 仓库
4. 配置构建设置：

| 配置项 | 值 |
|--------|-----|
| 构建命令 | `npm run build` |
| 安装命令 | `npm install` |
| 输出目录 | `./.next` |
| Node 版本 | `22.11.0` |

5. 点击 **「部署」**

### 步骤 3：配置环境变量

在项目设置 → 环境变量中添加：

```
DATABASE_URL=postgresql://USER:PASSWORD@YOUR_DB_HOST:5432/community_platform?schema=public
NEXTAUTH_SECRET=你的密钥（建议用 openssl rand -base64 32 生成）
NEXTAUTH_URL=https://你的域名
```

---

## 方式二：EdgeOne CLI 部署

### 步骤 1：安装并登录

```bash
npm install -g edgeone
edgeone login -s global
# 在浏览器中完成登录
```

### 步骤 2：部署

```bash
cd /workspace/community-platform
edgeone pages deploy -n community-platform -e production
```

### 步骤 3：配置环境变量

```bash
edgeone pages env add DATABASE_URL "你的数据库连接字符串"
edgeone pages env add NEXTAUTH_SECRET "你的密钥"
edgeone pages env add NEXTAUTH_URL "https://你的域名"
```

---

## 方式三：Pages Drop 拖放上传

1. 访问 **https://pages.edgeone.ai/zh/drop**
2. 将项目文件夹拖放到上传区域
3. 设置域名，点击部署

---

## 数据库方案

EdgeOne Pages 是 Serverless 平台，不支持内置 PostgreSQL。推荐以下方案：

### 方案 A：腾讯云 PostgreSQL（推荐）

1. 在腾讯云控制台创建 PostgreSQL 实例
2. 获取外网连接地址
3. 运行迁移：`npx prisma migrate deploy`
4. 将连接字符串设为环境变量 `DATABASE_URL`

### 方案 B：Supabase（免费方案）

1. 访问 https://supabase.com 创建免费项目
2. 获取 PostgreSQL 连接字符串
3. 运行迁移并配置环境变量

### 方案 C：Neon（Serverless PostgreSQL）

1. 访问 https://neon.tech 创建免费项目
2. 获取连接字符串
3. 配置环境变量

---

## 自定义域名

1. 在 EdgeOne Pages 控制台 → 域名管理
2. 添加自定义域名（如 `shequ.yujian.space`）
3. 在域名 DNS 添加 CNAME 记录指向 EdgeOne 分配的域名
4. 如使用中国大陆加速区域，域名需完成 ICP 备案

---

## 项目文件说明

```
community-platform/
├── edgeone.json         # EdgeOne Pages 配置
├── docker-compose.yml   # 本地开发 Docker 配置
├── prisma/schema.prisma # 数据库 Schema
├── .env.example         # 环境变量模板
└── ...
```

## 部署后验证

1. 访问分配的域名确认首页加载
2. 测试 `/login` 页面
3. 测试 `/api/auth/register` 接口
4. 确认数据库连接正常
