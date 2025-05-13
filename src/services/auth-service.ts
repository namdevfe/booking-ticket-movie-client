import http from '@/lib/http'
import { RegisterPayload } from '@/types/auth-type'
import { ApiResponse } from '@/types/global'

const authService = {
  register(payload: RegisterPayload) {
    const url = '/auth/register'
    return http.post<ApiResponse>(url, payload)
  }
}

export default authService
