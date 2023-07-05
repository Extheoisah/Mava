import { NextFunction, Request, Response, response, Router } from "express";
import LoggerInstance from "../../loaders/logger";
const route = Router();

export default (app: Router) => {
  app.use("/auth", route);
  route.post(
    "/signup",
    async (req: Request, res: Response, next: NextFunction) => {
      LoggerInstance.info("Calling Sign-Up endpoint with body: %o", req.body);
      return res.status(201).json({ message: "User Created successfully" });
    }
  );
};
