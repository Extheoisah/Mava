import { Router } from "express"
import { auth, health } from "./routes"

export default () => {
  const app = Router()
  auth(app)
  health(app)

  return app
}
