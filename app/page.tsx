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

      <footer className="mt-24 border-t border-neutral-200 pt-8 text-sm text-neutral-500 dark:border-neutral-800">
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
      className={`flex flex-col rounded-2xl border p-8 ${
        highlight
          ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
          : 'border-neutral-200 dark:border-neutral-800'
      }`}
    >
      <h2 className="text-xl font-semibold">{name}</h2>
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
      <a
        href={href}
        className={`mt-8 inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-medium transition ${
          highlight
            ? 'bg-white text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800'
            : 'bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200'
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
      <p className="text-sm font-medium text-neutral-500">Step {step}</p>
      <h3 className="mt-1 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
        {body}
      </p>
    </div>
  )
}
