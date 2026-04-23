export const metadata = {
  title: 'Linkage Labs — Competitive Intelligence Agent',
  description:
    'Pay-per-use competitive intelligence reports powered by Claude.',
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
