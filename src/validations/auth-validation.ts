import { Gender } from '@/constants/global'
import { z } from 'zod'

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .refine(
      (email) => {
        const parts = email.split('@')
        const domain = parts[1]
        return (
          domain && domain.split('.').length >= 2 && domain.endsWith('.com')
        )
      },
      {
        message: 'Email must have at least 2 domain segments and end with .com'
      }
    ),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
  firstName: z.string().trim().min(1, { message: 'First name is required' }),
  lastName: z.string().trim().min(1, { message: 'Last name is required' }),
  gender: z.enum([Gender.MALE, Gender.FEMALE], {
    required_error: 'Please select a gender'
  }),

  dateOfBirth: z.date({
    required_error: 'Please select a date of birth'
  })
})

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .refine(
      (email) => {
        const parts = email.split('@')
        const domain = parts[1]
        return (
          domain && domain.split('.').length >= 2 && domain.endsWith('.com')
        )
      },
      {
        message: 'Email must have at least 2 domain segments and end with .com'
      }
    ),
  password: z
    .string()
    .trim()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' })
})
