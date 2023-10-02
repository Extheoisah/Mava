import { Request, Response, NextFunction } from "express"
import LoggerInstance from "@server/loaders/logger"
import { VerifyTokenRes } from "@domain/authentication/types"
import { verifyToken } from "@services/authentication/token"
import { AccountRepository } from "@services/sequelize/Account"

export async function customerAuth(req: Request, res: Response, next: NextFunction) {
  LoggerInstance.info("Verifying Customer Auth token: %o")
  try {
    const verify: VerifyTokenRes = verifyToken(req)
    if (!verify.success) {
      return res.status(401).json({ success: false, message: verify.msg })
    }
    if (verify.success && verify.payload) {
      if (verify.payload.admin) {
        return res.status(401).json({ success: false, message: "unauthorize" })
      }
      const user = await AccountRepository(verify.payload.sub)
      if (!user) {
        return res.status(401).json({ success: false, message: "unauthorized" })
      }
      req.body.user = user
      next()
    } else {
      LoggerInstance.error("Verified Customer token without payload: %o", verify)
      return res.status(401).json({ success: false, message: "unauthorized" })
    }
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
    if (verify.success && verify.payload) {
      if (!verify.payload.admin) {
        return res.status(401).json({ success: false, message: "unauthorize" })
      }
      const user = await AccountRepository(verify.payload.sub)
      if (!user) {
        return res.status(401).json({ success: false, message: "unauthorized" })
      }
      req.body.user = user
      next()
    } else {
      LoggerInstance.error("Verified Admin token without payload: %o", verify)
      return res.status(401).json({ success: false, message: "unauthorized" })
    }
  } catch (error) {
    LoggerInstance.error("Error Verifying Admin Auth token: %o", error)
    return res.status(401).json({ success: false, message: "unauthorized" })
  }
}
