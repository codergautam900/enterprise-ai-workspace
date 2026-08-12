import type { NextFunction, Request, Response } from "express";

export default function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const status = (err as any).status || 500;
  const message = (err as any).message || "Internal server error";

  return res.status(status).json({ success: false, message });
}
