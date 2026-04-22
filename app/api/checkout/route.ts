import { NextResponse } from 'next/server'
import { getStripe, isPlanId, PLANS } from '@/lib/stripe'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const plan = (body as { plan?: unknown }).plan
  if (!isPlanId(plan)) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const config = PLANS[plan]
  const priceId = process.env[config.priceEnv]
  if (!priceId) {
    return NextResponse.json(
      { error: `Price not configured (${config.priceEnv})` },
      { status: 500 }
    )
  }

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? new URL(request.url).origin

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${base}/session/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/`,
      metadata: { plan },
    })

    if (!session.url) {
      return NextResponse.json(
        { error: 'Stripe did not return a redirect URL' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
