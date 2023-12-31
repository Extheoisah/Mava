import { Request, Response, Router } from "express"
import LoggerInstance from "../../server/loaders/logger"

const route = Router()

export const auth = (app: Router) => {
  app.use("/auth", route)
  route.post("/signup", async (req: Request, res: Response) => {
    LoggerInstance.info("Calling Sign-Up endpoint with body: %o", req.body)
    return res.status(201).json({ message: "User Created successfully" })
  })
}
