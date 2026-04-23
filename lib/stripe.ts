import 'server-only'
import Stripe from 'stripe'

export type PlanId = 'single' | 'pack'

export interface PlanConfig {
  id: PlanId
  label: string
  priceEnv: string
  defaultPriceId: string
  credits: number
}

export const PLANS: Record<PlanId, PlanConfig> = {
  single: {
    id: 'single',
    label: 'Single Analysis',
    priceEnv: 'STRIPE_PRICE_SINGLE',
    defaultPriceId: 'price_1TLqHK47kbovUlqNQ1sMlXJK',
    credits: 1,
  },
  pack: {
    id: 'pack',
    label: 'Credit Pack',
    priceEnv: 'STRIPE_PRICE_PACK',
    defaultPriceId: 'price_1TLqJE47kbovUlqNHBB8PvGB',
    credits: 5,
  },
}

export function resolvePriceId(plan: PlanId): string {
  const config = PLANS[plan]
  return process.env[config.priceEnv] ?? config.defaultPriceId
}

export function isPlanId(value: unknown): value is PlanId {
  return value === 'single' || value === 'pack'
}

let cached: Stripe | null = null

export function getStripe(): Stripe {
  if (cached) return cached
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  cached = new Stripe(key)
  return cached
}
