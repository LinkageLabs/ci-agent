import { NextResponse } from 'next/server'
import {
  getAnthropic,
  CI_SYSTEM_PROMPT,
  CLAUDE_MODEL,
  formatIntake,
  INTAKE_QUESTIONS,
} from '@/lib/agent'
import { getSessionByStripeId, saveIntakeAndReport } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { sessionId, intake } = body as {
    sessionId?: string
    intake?: Record<string, string>
  }

  if (!sessionId || !intake) {
    return NextResponse.json(
      { error: 'Missing sessionId or intake' },
      { status: 400 }
    )
  }

  const row = await getSessionByStripeId(sessionId)
  if (!row) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }
  if (row.status !== 'paid' || row.credits_remaining < 1) {
    return NextResponse.json(
      { error: 'Session not eligible for analysis' },
      { status: 403 }
    )
  }

  const missing = INTAKE_QUESTIONS.map((_, i) => String(i)).filter(
    (k) => !intake[k] || !intake[k].trim()
  )
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing intake answers: ${missing.join(', ')}` },
      { status: 400 }
    )
  }

  const anthropic = getAnthropic()
  const userContent = `Intake responses:\n\n${formatIntake(intake)}\n\nProduce the CI report now.`

  const encoder = new TextEncoder()
  let full = ''

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const claudeStream = anthropic.messages.stream({
          model: CLAUDE_MODEL,
          max_tokens: 64000,
          system: CI_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: userContent }],
        })

        for await (const event of claudeStream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            const chunk = event.delta.text
            full += chunk
            controller.enqueue(encoder.encode(chunk))
          }
        }

        await saveIntakeAndReport(row.id, intake, full)
        controller.close()
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Claude error'
        controller.enqueue(encoder.encode(`\n\n[Error: ${message}]`))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
