import { NextResponse } from 'next/server'

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'community-platform',
    version: '1.0.0',
    database: process.env.DATABASE_URL ? 'configured' : 'not_configured',
  }

  return NextResponse.json(health, { status: 200 })
}
