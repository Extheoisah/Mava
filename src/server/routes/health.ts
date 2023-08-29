import { Request, Response, Router } from "express"

import config from "@config"
import LoggerInstance from "@server/loaders/logger"

const route = Router()

export const health = (app: Router) => {
  app.use("/health", route)
  route.get("/", async (req: Request, res: Response) => {
    LoggerInstance.info("Calling status endpoint with body: %o", req.body)
    return res
      .status(200)
      .json({ status: "ok", message: `server running at port ${config.port}!` })
  })
}
