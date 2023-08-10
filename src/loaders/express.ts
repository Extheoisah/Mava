import express, { Request, Response } from "express"
import cors from "cors"
import routes from "@api/index"
import config from "@config/index"
import {
  CustomError,
  InternalServerError,
  NotFoundError,
} from "@api/middlewares/error-handlers"

export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get("/status", (req, res) => {
    res.status(200).end()
  })
  app.head("/status", (req, res) => {
    res.status(200).end()
  })

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors())

  app.use(express.json())
  // Load API routes
  app.use(config.api.prefix, routes())

  /**
   * Catch all non-matched routes and forward a NotFoundError.
   */
  app.use((req, res, next) => {
    const err: CustomError = NotFoundError(req.originalUrl)
    res.status(err.status).send(err)
    next(err)
  })

  app.use((err: unknown, req: Request, res: Response) => {
    const { status, message } = InternalServerError()
    return res.status(status).json({
      errors: {
        message,
      },
    })
  })
}
