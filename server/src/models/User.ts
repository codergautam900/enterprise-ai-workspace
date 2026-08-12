import { Schema, model } from "mongoose";

export type UserRole = "USER" | "ADMIN";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    avatar: { type: String, default: null, trim: true },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<IUser>("User", userSchema);
