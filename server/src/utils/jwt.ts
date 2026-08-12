import jwt, { type JwtPayload } from "jsonwebtoken";

export type AuthTokenRole = "USER" | "ADMIN";

export type AuthTokenPayload = {
  userId: string;
  role: AuthTokenRole;
};

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in environment variables");
}

const JWT_SECRET_STRING = JWT_SECRET;

const COOKIE_NAME = "enterprise_ai_auth";
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days

export function signToken(payload: AuthTokenPayload) {
  return jwt.sign(payload, JWT_SECRET_STRING, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): AuthTokenPayload {
  const decoded = jwt.verify(token, JWT_SECRET_STRING);

  if (!decoded || typeof decoded !== "object") {
    throw new Error("Invalid token");
  }

  const payload = decoded as JwtPayload & Partial<AuthTokenPayload>;

  if (!payload.userId || typeof payload.userId !== "string") {
    throw new Error("Invalid token payload");
  }

  if (payload.role !== "USER" && payload.role !== "ADMIN") {
    throw new Error("Invalid token payload");
  }

  return { userId: payload.userId, role: payload.role };
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
