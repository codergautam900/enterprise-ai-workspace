import type { NextFunction, Request, Response } from "express";
import { getAuthCookieName, verifyToken } from "../utils/jwt.js";

function getBearerToken(req: Request): string | null {
  const authHeader = req.headers.authorization;

  if (!authHeader || typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.slice("Bearer ".length).trim();
  return token || null;
}

function getCookieToken(req: Request): string | null {
  const cookies = req.cookies as unknown;

  if (typeof cookies !== "object" || cookies === null) {
    return null;
  }

  const token = (cookies as Record<string, unknown>)[getAuthCookieName()];
  return typeof token === "string" && token.trim() ? token.trim() : null;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = getBearerToken(req) ?? getCookieToken(req);

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const payload = verifyToken(token);
    req.user = {
      userId: payload.userId,
      role: payload.role,
    };
    return next();
  } catch {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
}
