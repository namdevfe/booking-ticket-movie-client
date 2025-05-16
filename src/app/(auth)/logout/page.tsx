'use client'

import authService from '@/services/auth-service'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const LogoutPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const accessToken = searchParams.get('accessToken')

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await authService.logoutFromNextServer()
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')

        // Redirect to login page
        router.push(`/login?redirectFrom=${pathname}`)
      } catch (error) {
        console.log('Logout Error', error)
      }
    }

    const rawAccessToken = localStorage.getItem('accessToken')
    const localAccessToken = rawAccessToken ? JSON.parse(rawAccessToken) : null

    if (accessToken === localAccessToken) {
      handleLogout()
    }
  }, [accessToken, pathname, router])

  return null
}

export default LogoutPage
