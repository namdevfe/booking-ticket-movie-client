import { registerSchema } from '@/validations/auth-validation'
import { z } from 'zod'

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export type RegisterPayload = z.infer<typeof registerSchema>
