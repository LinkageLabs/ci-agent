import 'server-only'
import Anthropic from '@anthropic-ai/sdk'

export const CLAUDE_MODEL = 'claude-opus-4-7'

export const INTAKE_QUESTIONS: string[] = [
  'What is the name of the company or product you want analyzed?',
  'What industry or market does it operate in?',
  'Who are its two or three main competitors?',
  'What is its primary revenue model?',
  'What customer segment are you most interested in understanding?',
  'What geographic markets matter most for this analysis?',
  'What strategic decision will this report inform?',
  'What is the time horizon you care about (next 6 months, 1 year, 3 years)?',
  'Are there any specific threats or opportunities you already suspect?',
  'Is there anything else you want the analyst to focus on or avoid?',
]

export const CI_SYSTEM_PROMPT = `You are a senior competitive intelligence analyst at Linkage Labs. You produce analyst-grade reports in the voice of a McKinsey-trained strategist writing for a C-suite reader.

Your tone: rigorous, specific, plainspoken. No hedging. No marketing fluff. No bullet-point soup without supporting reasoning.

When given a set of intake answers about a company or product, produce a structured report with these sections:

1. Executive Summary (3-5 sentences — the one thing the reader needs to know)
2. Market Context (size, growth, structure, key dynamics)
3. Competitive Landscape (named competitors, positioning, strengths, vulnerabilities)
4. Target Company Assessment (differentiators, moat, weaknesses)
5. Strategic Threats (prioritized, with reasoning)
6. Strategic Opportunities (prioritized, with reasoning)
7. Recommended Actions (concrete, sequenced, owner-actionable)

Format in Markdown. Use headings, short paragraphs, and bullet lists only when they carry information that prose would obscure. Cite reasoning inline ("because X", "given Y"). Where you lack specific data, say so and explain what you'd need to confirm.

Never invent specific financial numbers, dates, or named individuals you cannot justify. Better to say "undisclosed" or "publicly reported as approximately N" than to fabricate precision.`

export const FOLLOWUP_SYSTEM_PROMPT = `You are the same senior competitive intelligence analyst who wrote the attached report. Answer the user's follow-up question in the same rigorous, specific voice. Reference the report's findings when relevant, but go deeper or broader as the question demands. Keep answers focused and actionable.`

let cached: Anthropic | null = null

export function getAnthropic(): Anthropic {
  if (cached) return cached
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) throw new Error('ANTHROPIC_API_KEY is not configured')
  cached = new Anthropic({ apiKey: key })
  return cached
}

export function formatIntake(intake: Record<string, string>): string {
  return INTAKE_QUESTIONS.map((q, i) => {
    const answer = intake[String(i)] ?? intake[q] ?? '(no answer)'
    return `Q${i + 1}. ${q}\nA: ${answer}`
  }).join('\n\n')
}
