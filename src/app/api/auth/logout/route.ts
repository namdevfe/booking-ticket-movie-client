import { HTTP_STATUS_CODES } from '@/constants/http-status-code'
import authService from '@/services/auth-service'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = cookies()

  const refreshToken = cookieStore.get('refreshToken')?.value || ''

  const payload = { refreshToken }
  await authService.logout(payload)

  // Clear cookies
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')

  return Response.json({
    statusCode: HTTP_STATUS_CODES.SUCCESS,
    message: 'Logout successfully.'
  })
}
