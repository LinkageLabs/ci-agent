import { NextResponse } from 'next/server'
import { getSessionByStripeId } from '@/lib/db'
import { INTAKE_QUESTIONS } from '@/lib/agent'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const sessionId = url.searchParams.get('sessionId')
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })
  }

  const row = await getSessionByStripeId(sessionId)
  if (!row) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  if (row.status === 'completed' && row.report) {
    return NextResponse.json({
      status: 'completed' as const,
      report: row.report,
    })
  }

  if (row.status === 'paid') {
    return NextResponse.json({
      status: 'paid' as const,
      questions: INTAKE_QUESTIONS,
    })
  }

  return NextResponse.json({ status: row.status })
}
