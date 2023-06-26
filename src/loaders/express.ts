import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "../api";
import config from "../config/index";
export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Transforms the raw string of req.body into json
  app.use(express.json());
  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err: any = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  app.use((err: any, req: Request, res: Response) => {
    res.status(err.status || 500);
    return res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
