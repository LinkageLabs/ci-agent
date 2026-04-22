import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Linkage Labs — Competitive Intelligence Agent',
  description:
    'Pay-per-use competitive intelligence reports. Answer 10 questions, get an analyst-grade report powered by Claude.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
