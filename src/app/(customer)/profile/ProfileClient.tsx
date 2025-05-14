'use client'

import authService from '@/services/auth-service'
import { useEffect } from 'react'

const ProfileClient = () => {
  useEffect(() => {
    ;(async () => {
      try {
        const res = await authService.getProfile()
        console.log('🚀res---->', res)
      } catch (error) {
        console.log('🚀error---->', error)
      }
    })()
  }, [])

  return <div>ProfileClient</div>
}

export default ProfileClient
