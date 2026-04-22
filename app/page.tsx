'use client'

import { useState } from 'react'

type PlanId = 'single' | 'pack'

export default function LandingPage() {
  const [loading, setLoading] = useState<PlanId | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function buy(plan: PlanId) {
    setLoading(plan)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = (await res.json()) as { url?: string; error?: string }
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Checkout failed')
      }
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(null)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-12">
        <p className="text-sm uppercase tracking-widest text-neutral-500">
          Linkage Labs
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          Competitive intelligence, on demand.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
          Answer ten questions. Get an analyst-grade report in minutes — the
          same rigor a boutique CI firm would deliver, for a flat fee.
        </p>
      </header>

      <section className="grid gap-6 sm:grid-cols-2">
        <PricingCard
          name="Single Analysis"
          price="$149"
          description="One full report on one company or product."
          features={[
            '10 intake questions',
            'Full written CI report',
            'Downloadable PDF',
            'Follow-up questions included',
          ]}
          cta="Buy one analysis"
          loading={loading === 'single'}
          disabled={loading !== null}
          onClick={() => buy('single')}
        />
        <PricingCard
          name="Credit Pack"
          price="$599"
          description="Five reports. Save vs buying individually."
          features={[
            '5 separate analyses',
            'Same depth as single',
            'Use any time',
            'Ideal for ongoing scans',
          ]}
          cta="Buy pack"
          highlight
          loading={loading === 'pack'}
          disabled={loading !== null}
          onClick={() => buy('pack')}
        />
      </section>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
        >
          {error}
        </p>
      )}

      <section className="mt-20 grid gap-10 sm:grid-cols-3">
        <HowItWorks
          step="1"
          title="Pay"
          body="Secure checkout via Stripe. No account required."
        />
        <HowItWorks
          step="2"
          title="Answer"
          body="Ten focused intake questions in a chat interface."
        />
        <HowItWorks
          step="3"
          title="Receive"
          body="Full CI report streamed in real time. PDF and follow-ups included."
        />
      </section>

      <footer className="mt-24 border-t border-neutral-200 pt-8 text-sm text-neutral-500 dark:border-neutral-800">
        <p>© {new Date().getFullYear()} Linkage Labs</p>
      </footer>
    </main>
  )
}

function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  onClick,
  loading,
  disabled,
  highlight,
}: {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  onClick: () => void
  loading: boolean
  disabled: boolean
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-8 ${
        highlight
          ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
          : 'border-neutral-200 dark:border-neutral-800'
      }`}
    >
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="mt-4 text-4xl font-semibold">{price}</p>
      <p
        className={`mt-2 text-sm ${
          highlight
            ? 'text-neutral-300 dark:text-neutral-600'
            : 'text-neutral-600 dark:text-neutral-400'
        }`}
      >
        {description}
      </p>
      <ul className="mt-6 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f}>— {f}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`mt-8 w-full rounded-md px-4 py-3 text-sm font-medium transition disabled:opacity-50 ${
          highlight
            ? 'bg-white text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800'
            : 'bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200'
        }`}
      >
        {loading ? 'Redirecting…' : cta}
      </button>
    </div>
  )
}

function HowItWorks({
  step,
  title,
  body,
}: {
  step: string
  title: string
  body: string
}) {
  return (
    <div>
      <p className="text-sm font-medium text-neutral-500">Step {step}</p>
      <h3 className="mt-1 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
        {body}
      </p>
    </div>
  )
}
