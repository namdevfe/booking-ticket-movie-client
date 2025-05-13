'use client'

import authService from '@/services/auth-service'
import { useEffect } from 'react'

const ProfileClient = () => {
  const accessToken =
    localStorage.getItem('accessToken') !== null
      ? JSON.parse(localStorage.getItem('accessToken') ?? '')
      : null

  useEffect(() => {
    if (accessToken) {
      ;(async () => {
        try {
          const res = await authService.getProfile(accessToken)
          console.log('🚀res---->', res)
        } catch (error) {
          console.log('🚀error---->', error)
        }
      })()
    }
  }, [accessToken])

  return <div>ProfileClient</div>
}

export default ProfileClient
