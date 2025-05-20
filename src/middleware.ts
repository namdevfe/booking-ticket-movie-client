import authService from '@/services/auth-service'
import { Role } from '@/types/user-type'
import { NextResponse, NextRequest } from 'next/server'

const USER_PATHS = ['/profile']
const ADMIN_PATHS = ['/admin/dashboard']
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

  if (
    !accessToken &&
    (USER_PATHS.some((path) => path === pathname) ||
      ADMIN_PATHS.some((path) => path.startsWith(pathname)))
  ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  /**
   * - If has token and access to auth pages, will redirect to home page
   */
  if (accessToken) {
    // Check role
    const { data } = await authService.getProfile(accessToken)

    const role = data?.role

    if (data && AUTH_PATHS.some((path) => path.startsWith(pathname))) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // // // Admin role
    // if (role === Role.ADMIN) {
    //   return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    // }

    // // // User role
    // if (role === Role.USER) {
    //   return NextResponse.redirect(new URL('/profile', request.url))
    // }

    // Cannot access admin pages if user has role is user
    if (
      role === Role.USER &&
      ADMIN_PATHS.some((path) => path.startsWith(pathname))
    ) {
      return NextResponse.redirect(new URL('/access-denied', request.url))
    }

    // Cannot access user pages if user has role is admin
    if (
      role === Role.ADMIN &&
      USER_PATHS.some((path) => path.startsWith(pathname))
    ) {
      return NextResponse.redirect(new URL('/access-denied', request.url))
    }
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
    '/verify-email/success',
    '/admin/dashboard'
  ]
}
