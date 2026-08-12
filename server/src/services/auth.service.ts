import bcrypt from "bcryptjs";
import { UserModel, type UserRole } from "../models/User.js";

export type SafeUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};

function createAuthError(message: string, status: number): Error & { status: number } {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  return error;
}

function validateRegisterInput(name: string, email: string, password: string): void {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName) {
    throw createAuthError("Name is required", 400);
  }

  if (!trimmedEmail || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
    throw createAuthError("Valid email is required", 400);
  }

  if (!password || password.length < 8) {
    throw createAuthError("Password must be at least 8 characters", 400);
  }
}

function sanitizeUser(user: {
  _id?: { toString(): string } | string;
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}): SafeUser {
  return {
    id: user.id ?? (typeof user._id === "string" ? user._id : user._id?.toString() ?? ""),
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar ?? null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<SafeUser> {
  const name = data.name ?? "";
  const email = data.email ?? "";
  const password = data.password ?? "";

  validateRegisterInput(name, email, password);

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await UserModel.findOne({ email: normalizedEmail }).lean().exec();

  if (existingUser) {
    throw createAuthError("Email already exists", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: "USER",
  });

  return sanitizeUser(user.toObject());
}

export async function loginUser(email: string, password: string): Promise<SafeUser> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
    throw createAuthError("Valid email is required", 400);
  }

  if (!password) {
    throw createAuthError("Password is required", 400);
  }

  const user = await UserModel.findOne({ email: normalizedEmail }).select("+passwordHash").exec();

  if (!user || !user.passwordHash) {
    throw createAuthError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw createAuthError("Invalid email or password", 401);
  }

  return sanitizeUser(user.toObject());
}

export async function getUserById(userId: string): Promise<SafeUser | null> {
  const user = await UserModel.findById(userId).exec();

  if (!user) {
    return null;
  }

  return sanitizeUser(user.toObject());
}

export async function getCurrentUser(userId: string): Promise<SafeUser | null> {
  return getUserById(userId);
}
