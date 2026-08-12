import bcrypt from "bcryptjs";

const databaseNotConfiguredError = () => {
  const error = new Error("Database adapter not configured");
  (error as any).status = 500;
  throw error;
};

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  databaseNotConfiguredError();
}

export async function loginUser(email: string, password: string) {
  databaseNotConfiguredError();
}

export async function getUserById(userId: string) {
  databaseNotConfiguredError();
}

function sanitizeUser(user: {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl ?? null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
