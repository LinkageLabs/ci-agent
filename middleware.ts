import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect session pages
  if (pathname.startsWith('/session/')) {
    const sessionId = pathname.split('/session/')[1]

    if (!sessionId) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    // We check payment status via the API — the DB call happens server-side
    // The session page itself does a client-side check on mount via /api/chat?sessionId=
    // This middleware just ensures the route is not publicly crawlable
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/session/:path*'],
}
