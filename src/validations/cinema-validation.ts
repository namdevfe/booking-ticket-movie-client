import { REGEX } from '@/constants/validate'
import { z } from 'zod'

export const createCinemaSchema = z.object({
  name: z.string().min(1, 'Name is required').max(256).trim(),
  address: z.string().min(1, 'Address is required').max(256).trim(),
  coverImage: z.string().trim().optional(),
  description: z.string().optional(),
  images: z.array(z.string()),
  phoneNumber: z
  .string()
  .regex(new RegExp(REGEX.PHONE_NUMBER), { message: 'Invalid phone number' })
  .trim(),
  position: z
  .object({
    latitude: z.number(),
    longtitude: z.number()
  })
  .nullable()
  .optional()
})
