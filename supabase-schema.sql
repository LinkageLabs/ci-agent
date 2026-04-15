-- ─────────────────────────────────────────────────────────────────────────────
-- CI Agent — Supabase Schema
-- Run this in your Supabase project → SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

create table if not exists sessions (
  id                      uuid primary key default gen_random_uuid(),
  stripe_session_id       text unique not null,
  stripe_payment_intent_id text,
  status                  text not null default 'pending'
                            check (status in ('pending', 'paid', 'completed')),
  credits_remaining       integer not null default 1,
  intake                  jsonb,
  report                  text,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger sessions_updated_at
  before update on sessions
  for each row execute function update_updated_at();

-- Index for webhook lookups
create index if not exists sessions_stripe_session_id_idx on sessions (stripe_session_id);

-- Row Level Security (optional but recommended)
alter table sessions enable row level security;

-- Service role can do everything (your server uses the service role key)
create policy "Service role full access"
  on sessions for all
  using (true)
  with check (true);
