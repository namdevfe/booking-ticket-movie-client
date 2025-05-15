enum Role {
  ADMIN,
  USER
}

export interface User {
  _id: string
  email: string
  firstName: string
  lastName: string
  dateOfBirth: Date
  gender: 'male' | 'female'
  isVerifiedEmail: boolean
  role: Role
  createdAt: Date
  updatedAt: Date
  __v: number
}
