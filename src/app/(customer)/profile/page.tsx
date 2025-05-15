'use client'

import authService from '@/services/auth-service'
import { useEffect } from 'react'
// import authService from '@/services/auth-service'
// import { cookies } from 'next/headers'

const ProfilePage = () => {
  // const cookieStore = cookies()
  // const accessToken = cookieStore.get('accessToken')
  //   ? cookieStore.get('accessToken')?.value
  //   : null

  // if (!accessToken) return null

  // const profile: any = await authService.getProfile(accessToken)

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

  return (
    <div>
      {/* Xin chào, {profile?.data?.email} */}
      {/* <ProfileClient /> */}
    </div>
  )
}

export default ProfilePage
