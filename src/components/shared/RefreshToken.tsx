'use client'

import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import authService from '@/services/auth-service'

const BUFFER_TIME = 3 * 60 * 1000

const RefreshToken = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      const accessToken = localStorage.getItem('accessToken')
        ? JSON.parse(localStorage.getItem('accessToken') ?? '')
        : null

      if (accessToken) {
        const decoded = jwtDecode(accessToken)
        const expirationTime = Number(decoded.exp) * 1000 // Convert to miliseconds
        const now = Date.now()

        // Check expires time
        if (now >= expirationTime - BUFFER_TIME) {
          try {
            const res =
              await authService.refreshTokenFromNextClientToNextServer()

            if (res.data) {
              localStorage.setItem(
                'accessToken',
                JSON.stringify(res.data.accessToken)
              )
              localStorage.setItem(
                'refreshToken',
                JSON.stringify(res.data.refreshToken)
              )
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
    }, BUFFER_TIME)

    return () => clearInterval(interval)
  }, [])

  return null
}

export default RefreshToken
