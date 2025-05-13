import ProfileClient from '@/app/(customer)/profile/ProfileClient'
import authService from '@/services/auth-service'
import { cookies } from 'next/headers'

const ProfilePage = async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const profile: any = await authService.getProfile(accessToken as string)

  return (
    <div>
      <div>Hello, {profile?.data?.email}</div>
      <ProfileClient></ProfileClient>
    </div>
  )
}

export default ProfilePage
