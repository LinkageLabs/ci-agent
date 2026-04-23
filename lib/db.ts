import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export interface SessionRow {
  id: string
  stripe_session_id: string
  stripe_payment_intent_id: string | null
  status: 'pending' | 'paid' | 'completed'
  credits_remaining: number
  intake: Record<string, string> | null
  report: string | null
  created_at: string
  updated_at: string
}

let cached: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (cached) return cached
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error(
      'Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)'
    )
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cached
}

export async function createSessionFromStripe(
  stripeSessionId: string,
  paymentIntentId: string | null,
  credits: number
): Promise<SessionRow> {
  const db = getSupabase()
  const { data, error } = await db
    .from('sessions')
    .insert({
      stripe_session_id: stripeSessionId,
      stripe_payment_intent_id: paymentIntentId,
      status: 'paid',
      credits_remaining: credits,
    })
    .select()
    .single()

  if (error) throw new Error(`Failed to create session: ${error.message}`)
  return data as SessionRow
}

export async function getSessionById(
  sessionId: string
): Promise<SessionRow | null> {
  const db = getSupabase()
  const { data, error } = await db
    .from('sessions')
    .select('*')
    .eq('id', sessionId)
    .maybeSingle()

  if (error) throw new Error(`Failed to fetch session: ${error.message}`)
  return (data as SessionRow) ?? null
}

export async function getSessionByStripeId(
  stripeSessionId: string
): Promise<SessionRow | null> {
  const db = getSupabase()
  const { data, error } = await db
    .from('sessions')
    .select('*')
    .eq('stripe_session_id', stripeSessionId)
    .maybeSingle()

  if (error) throw new Error(`Failed to fetch session: ${error.message}`)
  return (data as SessionRow) ?? null
}

export async function saveIntakeAndReport(
  sessionId: string,
  intake: Record<string, string>,
  report: string
): Promise<void> {
  const db = getSupabase()
  const { error } = await db
    .from('sessions')
    .update({
      intake,
      report,
      status: 'completed',
      credits_remaining: 0,
    })
    .eq('id', sessionId)

  if (error) throw new Error(`Failed to save report: ${error.message}`)
}
