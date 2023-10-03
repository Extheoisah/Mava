import { Request, Response, Router } from "express"
import LoggerInstance from "../../server/loaders/logger"
import joi from "joi"
import { signUp } from "@services/authentication/signup"
import { AccountStatus, AccountType } from "@domain/shared/primitives"
import { CustomError } from "@server/middlewares/error"
import { CustomSuccess } from "@server/middlewares/success"

const route = Router()

export const auth = (app: Router) => {
  app.use("/auth", route)
  route.post("/signup", async (req: Request, res: Response) => {
    LoggerInstance.info("Calling Sign-Up endpoint with body: %o", req.body)
    /**
     * Body
     * Account Type (CUSTOMER)
     * Status (ACTIVE)
     * email
     * password
     * name
     */
    try {
      const success: CustomSuccess = await signUp({
        accountStatus: AccountStatus.ACTIVE,
        accountType: AccountType.CUSTOMER,
        isAdmin: false,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      })
      return res
        .status(success.status)
        .json({ message: success.message, data: success.data })
    } catch (error: any) {
      return res.status(error.status).json({ messsage: error.message })
    }
  })
}
