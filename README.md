# Linkage Labs — Competitive Intelligence Agent

A pay-per-use competitive intelligence platform. Clients pay via Stripe, answer 10 intake questions, and receive a full analyst-grade CI report powered by Claude.

---

## How It Works

1. Client lands on the marketing site and clicks "Buy Analysis"
2. Stripe Checkout handles payment → webhook creates a session in Supabase
3. Client is redirected to `/session/[sessionId]`
4. The agent asks 10 intake questions in a chat UI
5. Answers are combined with your proprietary system prompt **server-side** — Claude runs the full analysis
6. The report streams back to the client in real time
7. Client downloads PDF and asks follow-up questions — all included in the session

**Your prompts never touch the browser.** All Claude API calls are server → server.

---

## Setup

### 1. Clone and install
```bash
git clone <your-repo>
cd ci-agent
npm install
cp .env.local.example .env.local
```

### 2. Supabase
1. Create a project at supabase.com
2. Go to SQL Editor and run `supabase-schema.sql`
3. Copy your project URL and service role key into `.env.local`

### 3. Stripe
1. Create two products in your Stripe dashboard:
   - **Single Analysis** — one-time, $149 → copy the Price ID
   - **Credit Pack** — one-time, $599 → copy the Price ID
2. Add your publishable key, secret key, and price IDs to `.env.local`

### 4. Anthropic
1. Get your API key from console.anthropic.com
2. Add to `.env.local` as `ANTHROPIC_API_KEY`

### 5. Run locally
```bash
npm run dev
# In a second terminal for Stripe webhooks:
stripe listen --forward-to localhost:3000/api/webhook
```

---

## Deploy to Netlify

1. Push this repo to GitHub
2. Netlify → Add new site → Import from Git → select repo
3. Build settings auto-detected from `netlify.toml` — no changes needed
4. Add all env variables from `.env.local.example` in Netlify → Site settings → Environment variables
5. Set `NEXT_PUBLIC_BASE_URL` to your Netlify URL (e.g. `https://your-site.netlify.app`)
6. In Stripe Dashboard → Developers → Webhooks → Add endpoint:
   - URL: `https://your-site.netlify.app/api/webhook`
   - Event: `checkout.session.completed`
   - Copy the signing secret → add as `STRIPE_WEBHOOK_SECRET` in Netlify

---

## Project Structure

```
ci-agent/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── session/[sessionId]/
│   │   └── page.tsx                # Chat + report UI (post-payment)
│   └── api/
│       ├── checkout/route.ts       # Creates Stripe checkout session
│       ├── webhook/route.ts        # Stripe webhook → creates DB session
│       ├── chat/route.ts           # Intake questions + CI analysis (streaming)
│       ├── followup/route.ts       # Follow-up Q&A (streaming)
│       └── report/route.ts         # Fetches saved report
├── lib/
│   ├── agent.ts                    # YOUR PROMPT LIVES HERE — server-side only
│   ├── db.ts                       # Supabase helpers
│   └── stripe.ts                   # Stripe client + plan config
├── middleware.ts                   # Protects /session/* routes
├── supabase-schema.sql             # Run in Supabase SQL editor
├── netlify.toml                    # Netlify build config
└── .env.local.example              # Copy to .env.local and fill in
```

---

## Customization

- **Intake questions** — edit `INTAKE_QUESTIONS` in `lib/agent.ts`
- **CI prompt** — edit `CI_SYSTEM_PROMPT` in `lib/agent.ts`
- **Pricing** — update `PLANS` in `lib/stripe.ts` and prices in `app/page.tsx`
