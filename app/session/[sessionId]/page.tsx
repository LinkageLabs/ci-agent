'use client'

import { use, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'

type Phase = 'loading' | 'intake' | 'generating' | 'report' | 'error'

interface Message {
  role: 'agent' | 'user'
  text: string
}

export default function SessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>
}) {
  const { sessionId } = use(params)
  const [phase, setPhase] = useState<Phase>('loading')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [intake, setIntake] = useState<Record<string, string>>({})
  const [questionIndex, setQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [report, setReport] = useState('')
  const [followups, setFollowups] = useState<Message[]>([])
  const [followupInput, setFollowupInput] = useState('')
  const [streaming, setStreaming] = useState(false)

  const reportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    async function bootstrap() {
      try {
        const res = await fetch(
          `/api/report?sessionId=${encodeURIComponent(sessionId)}`
        )
        const data = (await res.json()) as {
          status?: 'pending' | 'paid' | 'completed'
          report?: string
          questions?: string[]
          error?: string
        }
        if (cancelled) return
        if (!res.ok) {
          setErrorMsg(data.error ?? 'Could not load session')
          setPhase('error')
          return
        }
        if (data.status === 'completed' && data.report) {
          setReport(data.report)
          setPhase('report')
          return
        }
        if (data.status === 'paid' && data.questions) {
          setQuestions(data.questions)
          setMessages([{ role: 'agent', text: data.questions[0] }])
          setPhase('intake')
          return
        }
        setErrorMsg('Session not ready. Please check your payment.')
        setPhase('error')
      } catch (err) {
        if (cancelled) return
        setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
        setPhase('error')
      }
    }
    bootstrap()
    return () => {
      cancelled = true
    }
  }, [sessionId])

  async function submitIntakeAnswer(answer: string) {
    const trimmed = answer.trim()
    if (!trimmed) return
    const newIntake = { ...intake, [String(questionIndex)]: trimmed }
    setIntake(newIntake)
    setMessages((m) => [...m, { role: 'user', text: trimmed }])
    setInput('')

    const nextIndex = questionIndex + 1
    if (nextIndex < questions.length) {
      setMessages((m) => [...m, { role: 'agent', text: questions[nextIndex] }])
      setQuestionIndex(nextIndex)
      return
    }

    setPhase('generating')
    await streamReport(newIntake)
  }

  async function streamReport(finalIntake: Record<string, string>) {
    setStreaming(true)
    setReport('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, intake: finalIntake }),
      })
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}))
        throw new Error(
          (data as { error?: string }).error ?? 'Report generation failed'
        )
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        setReport(buffer)
      }
      setPhase('report')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Report failed')
      setPhase('error')
    } finally {
      setStreaming(false)
    }
  }

  async function submitFollowup() {
    const trimmed = followupInput.trim()
    if (!trimmed || streaming) return
    const question = trimmed
    setFollowups((f) => [
      ...f,
      { role: 'user', text: question },
      { role: 'agent', text: '' },
    ])
    setFollowupInput('')
    setStreaming(true)
    try {
      const res = await fetch('/api/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, question }),
      })
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}))
        throw new Error(
          (data as { error?: string }).error ?? 'Follow-up failed'
        )
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        setFollowups((f) => {
          const copy = [...f]
          copy[copy.length - 1] = { role: 'agent', text: buffer }
          return copy
        })
      }
    } catch (err) {
      setFollowups((f) => {
        const copy = [...f]
        copy[copy.length - 1] = {
          role: 'agent',
          text:
            'Sorry — ' +
            (err instanceof Error ? err.message : 'follow-up failed'),
        }
        return copy
      })
    } finally {
      setStreaming(false)
    }
  }

  async function downloadPdf() {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF({ unit: 'pt', format: 'letter' })
    const margin = 54
    const width = doc.internal.pageSize.getWidth() - margin * 2
    const lines = doc.splitTextToSize(report, width) as string[]
    doc.setFontSize(11)
    doc.text(lines, margin, margin)
    doc.save('ci-report.pdf')
  }

  if (phase === 'loading') {
    return <CenterMessage title="Loading…" />
  }
  if (phase === 'error') {
    return (
      <CenterMessage
        title="Something went wrong"
        body={errorMsg ?? 'Please try again later.'}
      />
    )
  }

  if (phase === 'intake') {
    return (
      <main className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4 py-8">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand)]">
            Intake — Question {questionIndex + 1} of {questions.length}
          </p>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[color:var(--brand)]/20">
            <div
              className="h-full bg-[color:var(--brand)] transition-all"
              style={{
                width: `${((questionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </header>
        <div className="flex-1 space-y-4 overflow-y-auto">
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} text={m.text} />
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submitIntakeAnswer(input)
          }}
          className="mt-4 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            placeholder="Type your answer…"
            className="flex-1 rounded-md border border-[color:var(--brand)]/40 bg-transparent px-4 py-3 text-sm text-[color:var(--foreground)] focus:border-[color:var(--brand)] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-md bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-[color:var(--brand-ink)] transition hover:bg-[color:var(--brand-hover)] disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </main>
    )
  }

  if (phase === 'generating') {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand)]">
          Linkage Labs
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
          Generating your report…
        </h1>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          This typically takes one to three minutes.
        </p>
        <article ref={reportRef} className="markdown mt-8">
          <ReactMarkdown>{report || '…'}</ReactMarkdown>
        </article>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand)]">
            Linkage Labs
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[color:var(--foreground)]">
            Your report
          </h1>
        </div>
        <button
          type="button"
          onClick={downloadPdf}
          className="rounded-md border border-[color:var(--brand)] bg-transparent px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--brand)] hover:text-[color:var(--brand-ink)]"
        >
          Download PDF
        </button>
      </header>
      <article className="markdown">
        <ReactMarkdown>{report}</ReactMarkdown>
      </article>

      <section className="mt-12 border-t border-[color:var(--brand)]/30 pt-8">
        <h2 className="text-lg font-semibold text-[color:var(--foreground)]">
          Follow-up questions
        </h2>
        <p className="mt-1 text-sm text-[color:var(--muted)]">
          Ask anything about the analysis — included with your purchase.
        </p>
        <div className="mt-6 space-y-4">
          {followups.map((m, i) => (
            <ChatBubble key={i} role={m.role} text={m.text} />
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submitFollowup()
          }}
          className="mt-4 flex gap-2"
        >
          <input
            value={followupInput}
            onChange={(e) => setFollowupInput(e.target.value)}
            placeholder="Ask a follow-up…"
            className="flex-1 rounded-md border border-[color:var(--brand)]/40 bg-transparent px-4 py-3 text-sm text-[color:var(--foreground)] focus:border-[color:var(--brand)] focus:outline-none"
            disabled={streaming}
          />
          <button
            type="submit"
            disabled={streaming || !followupInput.trim()}
            className="rounded-md bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-[color:var(--brand-ink)] transition hover:bg-[color:var(--brand-hover)] disabled:opacity-50"
          >
            {streaming ? '…' : 'Ask'}
          </button>
        </form>
      </section>
    </main>
  )
}

function ChatBubble({ role, text }: { role: 'agent' | 'user'; text: string }) {
  const isAgent = role === 'agent'
  return (
    <div className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
          isAgent
            ? 'bg-[color:var(--surface)] text-[color:var(--foreground)] ring-1 ring-[color:var(--brand)]/20'
            : 'bg-[color:var(--brand)] text-[color:var(--brand-ink)]'
        }`}
      >
        {isAgent ? (
          <div className="markdown markdown--sm">
            <ReactMarkdown>{text || '…'}</ReactMarkdown>
          </div>
        ) : (
          text
        )}
      </div>
    </div>
  )
}

function CenterMessage({ title, body }: { title: string; body?: string }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--brand)]">
        Linkage Labs
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
        {title}
      </h1>
      {body && <p className="mt-3 text-sm text-[color:var(--muted)]">{body}</p>}
    </main>
  )
}
