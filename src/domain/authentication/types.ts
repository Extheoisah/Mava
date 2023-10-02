export interface VerifyTokenRes {
  success: boolean
  msg?: string
  payload?: JwtPayload
}

export interface JwtPayload {
  sub: string
  name: string
  admin: boolean
}
