import { Request, Response, NextFunction } from "express"
import { Account } from "../../models/account"
import LoggerInstance from "@server/loaders/logger"
import { VerifyTokenRes } from "@domain/authentication/types"
import { verifyToken } from "@services/authentication/token"

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
