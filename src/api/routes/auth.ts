import { NextFunction, Request, Response, response, Router } from "express";
const route = Router();

export default (app: Router) => {
  app.use("/auth", route);
  route.post(
    "/signup",
    async (req: Request, res: Response, next: NextFunction) => {
      return res.status(201).json({ message: "User Created successfully" });
    }
  );
};
