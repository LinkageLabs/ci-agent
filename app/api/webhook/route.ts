import { NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe, isPlanId, PLANS } from '@/lib/stripe'
import { createSessionFromStripe, getSessionByStripeId } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!signature || !secret) {
    return NextResponse.json(
      { error: 'Missing signature or webhook secret' },
      { status: 400 }
    )
  }

  const raw = await request.text()
  const stripe = getStripe()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(raw, signature, secret)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Invalid signature'
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const checkoutSession = event.data.object as Stripe.Checkout.Session
  const planMeta = checkoutSession.metadata?.plan
  const credits =
    isPlanId(planMeta) ? PLANS[planMeta].credits : 1

  const existing = await getSessionByStripeId(checkoutSession.id)
  if (existing) {
    return NextResponse.json({ received: true, sessionId: existing.id })
  }

  const paymentIntent =
    typeof checkoutSession.payment_intent === 'string'
      ? checkoutSession.payment_intent
      : (checkoutSession.payment_intent?.id ?? null)

  const row = await createSessionFromStripe(
    checkoutSession.id,
    paymentIntent,
    credits
  )

  return NextResponse.json({ received: true, sessionId: row.id })
}
