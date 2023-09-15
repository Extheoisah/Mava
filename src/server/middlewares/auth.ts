import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import config from "@config"
import { Account } from "../../models/account"
import LoggerInstance from "../../server/loaders/logger"
import { VerifyTokenRes, JwtPayload } from "../../domain/authentication/types"

function verifyToken(req: Request): VerifyTokenRes {
  LoggerInstance.info("Verifying Auth token: %o")
  try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
      return { success: true, msg: "invalid token" }
    }
    const payload = jwt.verify(token, config.secret) as JwtPayload
    return { success: true, payload }
  } catch (error) {
    LoggerInstance.error("Error Verifying Auth token: %o", error)
    return { success: false, msg: "invalid token" }
  }
}

export async function customerAuth(req: Request, res: Response, next: NextFunction) {
  LoggerInstance.info("Verifying Customer Auth token: %o")
  try {
    const verify: VerifyTokenRes = verifyToken(req)
    if (!verify.success) {
      return res.status(401).json({ success: false, message: verify.msg })
    }
    if (verify.payload?.admin) {
      return res.status(401).json({ success: false, message: "unauthorize" })
    }
    const user = (await Account.findOne({
      where: { id: verify.payload?.sub },
    })) as Account
    if (!user) {
      return res.status(401).json({ success: false, message: "unauthorized" })
    }
    req.body.user = user
    next()
  } catch (error) {
    LoggerInstance.error("Error Verifying Customer Auth token: %o", error)
    return res.status(401).json({ success: false, message: "unauthorized" })
  }
}

export async function adminAuth(req: Request, res: Response, next: NextFunction) {
  LoggerInstance.info("Verifying Admin Auth token: %o")
  try {
    const verify: VerifyTokenRes = verifyToken(req)
    if (!verify.success) {
      return res.status(401).json({ success: false, message: verify.msg })
    }
    if (!verify.payload?.admin) {
      return res.status(401).json({ success: false, message: "unauthorize" })
    }
    const user = (await Account.findOne({
      where: { id: verify.payload?.sub },
    })) as Account
    if (!user) {
      return res.status(401).json({ success: false, message: "unauthorized" })
    }
    req.body.user = user
    next()
  } catch (error) {
    LoggerInstance.error("Error Verifying Admin Auth token: %o", error)
    return res.status(401).json({ success: false, message: "unauthorized" })
  }
}
