import authService from '@/services/auth-service'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = cookies()

  const refreshToken = cookieStore.get('refreshToken')?.value

  let res: Record<string, any> = {}

  if (refreshToken) {
    try {
      const payload = { refreshToken }
      res = await authService.refreshToken(payload)

      if (res.data) {
        cookieStore.set('accessToken', res.data?.accessToken, {
          secure: true,
          httpOnly: true,
          sameSite: 'lax',
          path: '/'
        })

        cookieStore.set('refreshToken', res.data?.refreshToken, {
          secure: true,
          httpOnly: true,
          sameSite: 'lax',
          path: '/'
        })
      }
    } catch (error) {
      console.log('Error from api route refresh-token', error)
    }
  }

  return Response.json(res)
}
