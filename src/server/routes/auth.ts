import { Request, Response, Router } from "express"
import LoggerInstance from "../../server/loaders/logger"
import { signUp } from "../../services/authentication/signUp"
import { AccountStatus, AccountType } from "@domain/shared/primitives"
import { CustomSuccess } from "@server/middlewares/success"
import { signIn } from "@services/authentication/signIn"
import { CreateCustomError } from "@server/middlewares/error"

const route = Router()

export const auth = (app: Router) => {
  app.use("/auth", route)
  route.post("/signup", async (req: Request, res: Response) => {
    LoggerInstance.info("Calling Sign-Up endpoint with body: %o", req.body)
    /**
     ********* BODY **********
     * Account Type (CUSTOMER)
     * Status (ACTIVE)
     * email
     * password
     * name
     */
    try {
      const response = await signUp({
        accountStatus: AccountStatus.ACTIVE,
        accountType: AccountType.CUSTOMER,
        isAdmin: false,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      })
      return res
        .status(response.status)
        .json({ message: response.message, data: response.data })
    } catch (error) {
      if (error instanceof CreateCustomError) {
        return res.status(error.status).json({ message: error.message })
      }
      return res
        .status(500)
        .json({ message: "An error occurred, please try again later" })
    }
  })

  route.post("/signin", async (req: Request, res: Response) => {
    LoggerInstance.info("Calling Sign-In endpoint with body: %o", req.body)
    try {
      const response: CustomSuccess = await signIn({
        email: req.body.email,
        password: req.body.password,
      })
      return res
        .status(response.status)
        .json({ message: response.message, data: response.data })
    } catch (error) {
      if (error instanceof CreateCustomError) {
        return res.status(error.status).json({ message: error.message })
      }
      return res
        .status(500)
        .json({ message: "An error occurred, please try again later" })
    }
  })
}
