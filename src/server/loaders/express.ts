import cors from "cors"
import express, { Response } from "express"

import config from "@config"
import routes from "@server/api"
import {
  CustomError,
  InternalServerError,
  NotFoundError,
} from "@server/middlewares/error"

export default ({ app }: { app: express.Application }) => {
  // Enable Cross Origin Resource Sharing to all origins by default
  /**
   * @TODO whitelist origins where necessary e.g. webhooks
   */
  app.use(cors())
  app.use(express.json())
  app.use(config.api.prefix, routes())

  /**
   * Catch all non-matched routes and forward a NotFoundError.
   */
  app.use((req, res, next) => {
    const err: CustomError = new NotFoundError(req.originalUrl)
    res.status(err.status).send(err)
    next(err)
  })

  app.use((err: unknown, res: Response) => {
    const error = new InternalServerError()
    return res.status(error.status).json(error.message || err)
  })
}
