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
  }
}

export default authService
