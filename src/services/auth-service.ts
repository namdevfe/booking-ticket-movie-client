import http from '@/lib/http'
import {
  LoginPayload,
  LoginRes,
  RegisterPayload,
  RetryActivePayload
} from '@/types/auth-type'
import { ApiResponse } from '@/types/global'
import { User } from '@/types/user-type'

const authService = {
  register(payload: RegisterPayload) {
    const url = '/auth/register'
    return http.post<ApiResponse>(url, payload)
  },
  login(payload: LoginPayload) {
    const url = '/auth/login'
    return http.post<ApiResponse<LoginRes>>(url, payload)
  },
  logout(payload: { refreshToken: string }) {
    const url = '/auth/logout'
    return http.put<ApiResponse>(url, payload)
  },
  logoutFromNextServer() {
    const url = '/api/auth/logout'
    return http.post<ApiResponse>(
      url,
      {},
      {
        baseUrl: ''
      }
    )
  },
  auth(payload: { accessToken: string; refreshToken: string }) {
    const url = '/api/auth'
    return http.post<any>(url, payload, { baseUrl: '' })
  },
  getProfile(accessToken?: string) {
    const url = '/auth/profile'
    return http.get<ApiResponse<User>>(
      url,
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        : undefined
    )
  },
  verifyEmail(token: string) {
    const url = `/auth/verify-email?verifyToken=${token}`
    return http.get<ApiResponse>(url)
  },
  refreshToken(payload: { refreshToken: string }) {
    const url = '/auth/refresh-token'
    return http.post<ApiResponse<LoginRes>>(url, payload)
  },
  refreshTokenFromNextClientToNextServer() {
    const url = '/api/auth/refresh-token'
    return http.post<ApiResponse<LoginRes>>(url, null, { baseUrl: '' })
  },
  retryActive(payload: RetryActivePayload) {
    const url = '/auth/retry-active'
    return http.post<ApiResponse>(url, payload)
  }
}

export default authService
