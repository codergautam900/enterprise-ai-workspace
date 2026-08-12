import jwt, { type JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in environment variables");
}

const JWT_SECRET_STRING = JWT_SECRET;

const COOKIE_NAME = "enterprise_ai_auth";
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days

export function signToken(payload: { userId: string }) {
  return jwt.sign(payload, JWT_SECRET_STRING, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  const decoded = jwt.verify(token, JWT_SECRET_STRING);

  if (!decoded || typeof decoded !== "object") {
    throw new Error("Invalid token");
  }

  const payload = decoded as JwtPayload & { userId?: string };

  if (!payload.userId || typeof payload.userId !== "string") {
    throw new Error("Invalid token payload");
  }

  return { userId: payload.userId };
}

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  } as const;
}

export function getAuthCookieName() {
  return COOKIE_NAME;
}
