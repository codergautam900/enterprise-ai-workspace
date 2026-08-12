import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { getAuthCookieName, getAuthCookieOptions, signToken } from "../utils/jwt.js";
import { getCurrentUser, loginUser, registerUser } from "../services/auth.service.js";

export async function registerController(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      return res.status(400).json({ success: false, message: firstError?.msg || "Invalid input" });
    }

    const { name, email, password } = req.body as { name?: string; email?: string; password?: string };
    const user = await registerUser({ name: name ?? "", email: email ?? "", password: password ?? "" });
    const token = signToken({ userId: user.id, role: user.role });

    res.cookie(getAuthCookieName(), token, getAuthCookieOptions());
    return res.status(201).json({ success: true, data: { user } });
  } catch (error) {
    return next(error);
  }
}

export async function loginController(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      return res.status(400).json({ success: false, message: firstError?.msg || "Invalid input" });
    }

    const { email, password } = req.body as { email?: string; password?: string };
    const user = await loginUser(email ?? "", password ?? "");
    const token = signToken({ userId: user.id, role: user.role });

    res.cookie(getAuthCookieName(), token, getAuthCookieOptions());
    return res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    return next(error);
  }
}

export async function logoutController(_req: Request, res: Response) {
  res.clearCookie(getAuthCookieName(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  return res.status(200).json({ success: true, data: { message: "Logged out successfully" } });
}

export async function meController(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    const user = await getCurrentUser(userId);

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    return res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    return next(error);
  }
}
