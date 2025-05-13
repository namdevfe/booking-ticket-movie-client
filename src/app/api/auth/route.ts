import { LoginRes } from '@/types/auth-type'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const res: LoginRes = await request.json()
  const cookieStore = cookies()

  if (!res) {
    throw new Error('Token is required!')
  }

  cookieStore.set('accessToken', res.accessToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    path: '/'
  })

  cookieStore.set('refreshToken', res.refreshToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    path: '/'
  })

  return Response.json({
    statusCode: 200,
    message: 'Set token to cookies successfully.'
  })
}
