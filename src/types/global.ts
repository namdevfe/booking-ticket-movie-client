export interface ApiResponse<T = any> {
  statusCode: number
  message: string
  data?: T
}

export interface ApiError extends ApiResponse {
  errors?: any[]
}
