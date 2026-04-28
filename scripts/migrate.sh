#!/bin/bash
# EdgeOne Pages 部署后数据库迁移脚本
# 使用方式: 在 EdgeOne 构建命令中添加此脚本
# 或者部署后在本地执行: bash scripts/migrate.sh <DATABASE_URL>

set -e

echo "🔧 开始数据库迁移..."

# 如果传入了 DATABASE_URL 参数，使用它
if [ -n "$1" ]; then
  export DATABASE_URL="$1"
  echo "📌 使用传入的 DATABASE_URL"
elif [ -z "$DATABASE_URL" ]; then
  echo "❌ 错误: 未设置 DATABASE_URL 环境变量"
  echo "用法: bash scripts/migrate.sh <DATABASE_URL>"
  echo "或者: export DATABASE_URL=xxx && bash scripts/migrate.sh"
  exit 1
fi

# 生成 Prisma Client
echo "📦 生成 Prisma Client..."
npx prisma generate

# 执行数据库迁移
echo "🚀 执行数据库迁移..."
npx prisma migrate deploy

echo "✅ 数据库迁移完成!"
