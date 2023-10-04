import { AccountStatus, AccountType } from "@domain/shared/primitives"

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

export interface CreateUser {
  accountStatus: AccountStatus
  accountType: AccountType
  email: string
  password: string
  name: string
  isAdmin: boolean
}

export interface LoginUser {
  email: string
  password: string
}
