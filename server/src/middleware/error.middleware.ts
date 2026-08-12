import type { NextFunction, Request, Response } from "express";
import multer from "multer";

function getErrorStatus(err: unknown): number {
  if (err instanceof multer.MulterError) {
    return 400;
  }

  if (typeof err === "object" && err !== null && "status" in err) {
    const status = err.status;
    if (typeof status === "number") {
      return status;
    }
  }

  return 500;
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === "object" && err !== null && "message" in err && typeof err.message === "string") {
    return err.message;
  }

  return "Internal server error";
}

export default function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const status = getErrorStatus(err);
  const message = getErrorMessage(err);

  return res.status(status).json({ success: false, message });
}
