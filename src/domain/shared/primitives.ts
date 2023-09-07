export enum AccountType {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  LOCKED = "LOCKED",
}

export enum WalletType {
  BTC = "BTC",
  USD = "USD",
}

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
}

export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  PENDING = "PENDING",
}

export enum TargetType {
  INTERNAL_WALLET = "INTERNAL_WALLET",
  EXTERNAL_WALLET = "EXTERNAL_WALLET",
  EXTERNAL_BANK = "EXTERNAL_BANK",
}

export enum KycStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum TransactionMetaType {
  LIGHTNING = "LIGHTNING",
  ONCHAIN = "ONCHAIN",
  FIAT = "FIAT",
}

export interface JwtPayload {
  sub: string
  name: string
  admin: boolean
}
