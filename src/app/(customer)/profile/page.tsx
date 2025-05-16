import authService from '@/services/auth-service'
import { cookies } from 'next/headers'

const ProfilePage = async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')
    ? cookieStore.get('accessToken')?.value
    : null

  if (!accessToken) return null

  const profile = await authService.getProfile(accessToken)

  return <div>Xin chào, {profile.data?.email}</div>
}

export default ProfilePage
