import { Request } from "express"
import { VerifyTokenRes, JwtPayload } from "../../domain/authentication/types"
import LoggerInstance from "@server/loaders/logger"
import jwt from "jsonwebtoken"
import config from "@config"

export function verifyToken(req: Request): VerifyTokenRes {
  LoggerInstance.info("Verifying Auth token: %o")
  try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
      return { success: false, msg: "invalid token" }
    }
    const payload = jwt.verify(token, config.secret) as JwtPayload
    return { success: true, payload }
  } catch (error) {
    LoggerInstance.error("Error Verifying Auth token: %o", error)
    return { success: false, msg: "invalid token" }
  }
}

export function createJwtToken(payload: JwtPayload) {
  const SECRET = config.secret
  const token = jwt.sign(payload, SECRET)
  return token
}
