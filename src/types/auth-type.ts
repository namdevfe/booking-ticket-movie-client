import {
  loginSchema,
  registerSchema,
  retryActiveSchema
} from '@/validations/auth-validation'
import { z } from 'zod'

export type RegisterPayload = z.infer<typeof registerSchema>

export type LoginPayload = z.infer<typeof loginSchema>

export type LoginRes = {
  accessToken: string
  refreshToken: string
}

export type RetryActivePayload = z.infer<typeof retryActiveSchema>
