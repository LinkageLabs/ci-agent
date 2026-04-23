export default function Page() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', margin: '0 0 1rem' }}>
        Linkage Labs — Competitive Intelligence Agent
      </h1>
      <p style={{ maxWidth: '42rem', color: '#555', lineHeight: 1.6 }}>
        Analyst-grade competitive intelligence reports, delivered on demand.
        Site setup is in progress — please check back shortly.
      </p>
    </main>
  )
}
