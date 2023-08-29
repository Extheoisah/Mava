import dotenv from "dotenv"
import { resolve } from "path"
import { MAVA_API_PORT } from "./process"

interface Config {
  port: number
  api: {
    prefix: string
  }
  logs: {
    level: string
  }
}
const isDevelopment = process.env.NODE_ENV === "development"

if (isDevelopment) {
  const envFound = dotenv.config({
    path: resolve(__dirname, "../../.env"),
  })
  if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file in development mode ⚠️")
  }
}

const config: Config = {
  port: MAVA_API_PORT,
  api: {
    prefix: "/api",
  },
  logs: {
    level: process.env.LOG_LEVEL || "info",
  },
}

export default config
