const PAYMENT_LINK_SINGLE =
  'https://buy.stripe.com/5kQdR28Yl3LX4vY4AOcQU01'
const PAYMENT_LINK_PACK =
  'https://buy.stripe.com/28EcMY6Qdcit7Ia8R4cQU02'
const PAYMENT_LINK_ENTERPRISE =
  'https://buy.stripe.com/aFaeV60rPeqB1jMffscQU03'

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--brand)]">
          Linkage Labs
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
          Competitive intelligence,{' '}
          <span className="text-[color:var(--accent)]">on demand.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[color:var(--muted)]">
          Answer ten questions. Get an analyst-grade report in minutes — the
          same rigor a boutique CI firm would deliver, for a flat fee.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <PricingCard
          name="Single Analysis"
          description="One full report on one company or product."
          features={[
            '10 intake questions',
            'Full written CI report',
            'Downloadable PDF',
            'Follow-up questions included',
          ]}
          cta="Buy one analysis"
          href={PAYMENT_LINK_SINGLE}
        />
        <PricingCard
          name="Credit Pack"
          description="Five reports. Save vs buying individually."
          features={[
            '5 separate analyses',
            'Same depth as single',
            'Use any time',
            'Ideal for ongoing scans',
          ]}
          cta="Buy pack"
          highlight
          href={PAYMENT_LINK_PACK}
        />
        <PricingCard
          name="Enterprise Bundle"
          description="For teams running continuous market scans."
          features={[
            'Expanded report volume',
            'Priority turnaround',
            'Shared across your team',
            'Dedicated follow-up support',
          ]}
          cta="Buy enterprise"
          href={PAYMENT_LINK_ENTERPRISE}
        />
      </section>

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

      <footer className="mt-24 border-t border-[color:var(--brand)]/30 pt-8 text-sm text-[color:var(--muted)]">
        <p>© {new Date().getFullYear()} Linkage Labs</p>
      </footer>
    </main>
  )
}

function PricingCard({
  name,
  description,
  features,
  cta,
  href,
  highlight,
}: {
  name: string
  description: string
  features: string[]
  cta: string
  href: string
  highlight?: boolean
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl border p-8 transition ${
        highlight
          ? 'border-[color:var(--brand-ink)] bg-[color:var(--brand-ink)] text-white shadow-lg shadow-[color:var(--brand)]/20'
          : 'border-[color:var(--brand)]/40 bg-[color:var(--surface)] text-[color:var(--foreground)] hover:border-[color:var(--brand)]'
      }`}
    >
      <h2
        className={`text-xl font-semibold ${
          highlight ? 'text-[color:var(--brand)]' : ''
        }`}
      >
        {name}
      </h2>
      <p
        className={`mt-2 text-sm ${
          highlight ? 'text-white/75' : 'text-[color:var(--muted)]'
        }`}
      >
        {description}
      </p>
      <ul
        className={`mt-6 space-y-2 text-sm ${
          highlight ? 'text-white/90' : 'text-[color:var(--foreground)]'
        }`}
      >
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <span
              className={
                highlight
                  ? 'text-[color:var(--brand)]'
                  : 'text-[color:var(--accent)]'
              }
            >
              ▸
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={href}
        className={`mt-8 inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-semibold transition ${
          highlight
            ? 'bg-[color:var(--brand)] text-[color:var(--brand-ink)] hover:bg-[color:var(--brand-hover)]'
            : 'bg-[color:var(--brand-ink)] text-white hover:bg-[color:var(--foreground)]'
        }`}
      >
        {cta}
      </a>
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
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)]">
        Step {step}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-[color:var(--foreground)]">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[color:var(--muted)]">{body}</p>
    </div>
  )
}
