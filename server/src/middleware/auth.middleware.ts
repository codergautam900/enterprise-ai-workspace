import type { NextFunction, Request, Response } from "express";
import { getAuthCookieName, verifyToken } from "../utils/jwt.js";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[getAuthCookieName()];

  if (!token || typeof token !== "string") {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const payload = verifyToken(token);
    (req as any).userId = payload.userId;
    return next();
  } catch {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
}
