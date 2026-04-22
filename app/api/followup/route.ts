import { NextResponse } from 'next/server'
import {
  getAnthropic,
  FOLLOWUP_SYSTEM_PROMPT,
  CLAUDE_MODEL,
} from '@/lib/agent'
import { getSessionByStripeId } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { sessionId, question } = body as {
    sessionId?: string
    question?: string
  }

  if (!sessionId || !question?.trim()) {
    return NextResponse.json(
      { error: 'Missing sessionId or question' },
      { status: 400 }
    )
  }

  const row = await getSessionByStripeId(sessionId)
  if (!row || row.status !== 'completed' || !row.report) {
    return NextResponse.json(
      { error: 'No completed report for this session' },
      { status: 404 }
    )
  }

  const anthropic = getAnthropic()
  const userContent = `Here is the report you previously produced:\n\n---\n\n${row.report}\n\n---\n\nFollow-up question: ${question.trim()}`

  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const claudeStream = anthropic.messages.stream({
          model: CLAUDE_MODEL,
          max_tokens: 64000,
          system: FOLLOWUP_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: userContent }],
        })

        for await (const event of claudeStream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
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
