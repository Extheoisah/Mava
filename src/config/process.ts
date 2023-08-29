import { config } from "dotenv"
import { ConfigError } from "./error"
import { BtcNetwork } from "../domain/bitcoin/types"

config()

export const MAVA_API_PORT = Number(process.env.MAVA_API_PORT || 8000)

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) {
  console.log(jwtSecret, "jwt")
  throw new ConfigError("missing JWT_SECRET")
}

export const JWT_SECRET = jwtSecret

export const isProd = process.env.NODE_ENV === "production"
export const isDev = process.env.NODE_ENV === "development"

const btcNetwork = process.env.NETWORK
const networks = ["mainnet", "testnet", "signet", "regtest"]

if (!btcNetwork && !networks.includes(btcNetwork!)) {
  console.log(btcNetwork, "network")
  throw new ConfigError(`missing or invalid NETWORK: ${btcNetwork}`)
}

export const BTC_NETWORK = btcNetwork as BtcNetwork
