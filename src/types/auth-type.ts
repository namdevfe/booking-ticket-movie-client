import { loginSchema, registerSchema } from '@/validations/auth-validation'
import { z } from 'zod'

export type RegisterPayload = z.infer<typeof registerSchema>

export type LoginPayload = z.infer<typeof loginSchema>

export type LoginRes = {
  accessToken: string
  refreshToken: string
}
