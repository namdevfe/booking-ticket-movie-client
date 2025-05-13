import http from '@/lib/http'
import { LoginPayload, LoginRes, RegisterPayload } from '@/types/auth-type'
import { ApiResponse } from '@/types/global'

const authService = {
  register(payload: RegisterPayload) {
    const url = '/auth/register'
    return http.post<ApiResponse>(url, payload)
  },
  login(payload: LoginPayload) {
    const url = '/auth/login'
    return http.post<ApiResponse<LoginRes>>(url, payload)
  },
  auth(payload: { accessToken: string; refreshToken: string }) {
    const url = '/api/auth'
    return http.post<any>(url, payload, { baseUrl: '' })
  },
  getProfile(accessToken: string) {
    const url = '/auth/profile'
    return http.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}

export default authService
