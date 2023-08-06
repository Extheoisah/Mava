import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "@config";
import { JwtPayload } from "@helpers/types";

interface VerifyTokenRes {
  success: boolean;
  msg?: string;
  payload?: JwtPayload;
}

function verifyToken(req: Request): VerifyTokenRes {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return { success: true, msg: "invalid token" };
    }
    const payload = jwt.verify(token, config.secret) as JwtPayload;
    return { success: true, payload };
  } catch (error) {
    return { success: false, msg: "invalid token" };
  }
}
