import { NextResponse, NextRequest } from 'next/server'

const PRIVATE_PATHS = ['/profile']
const AUTH_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
  '/logout',
  '/reset-password',
  '/verify-email',
  '/verify-email/success'
]

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const accessToken = request.cookies.get('accessToken')?.value

  if (!accessToken && PRIVATE_PATHS.some((path) => path === pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  /**
   * - If has token and access to auth pages, will redirect to home page
   */
  if (accessToken && AUTH_PATHS.some((path) => path.startsWith(pathname))) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: [
    '/profile',
    '/login',
    '/register',
    '/forgot-password',
    '/logout',
    '/reset-password',
    '/verify-email',
    '/verify-email/success'
  ]
}
