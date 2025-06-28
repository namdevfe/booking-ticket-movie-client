import { createCinemaSchema } from "@/validations/cinema-validation";
import { z } from "zod";

export interface Position {
  latitude: number
  longtitude: number
}

export interface Cinema {
  _id: string
  slug: string
  name: string
  description?: string
  coverImage?: string
  images: string[]
  phoneNumber: string
  address: string
  position?: Position | null
}

export type CreateCinemaPayload = z.infer<typeof createCinemaSchema>