import { registerSchema } from '@/validations/auth-validation'
import { z } from 'zod'

export type RegisterPayload = z.infer<typeof registerSchema>
