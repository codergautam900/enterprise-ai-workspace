import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    avatarUrl: { type: String, default: null, trim: true },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ email: 1 }, { unique: true });

export const UserModel = model<IUser>("User", userSchema);
