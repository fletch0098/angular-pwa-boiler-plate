export interface ApiError {
  message: string
  httpStatus: number
  internalCode: number
  details: string[]
  internalError: string
  isPublic: boolean
}
