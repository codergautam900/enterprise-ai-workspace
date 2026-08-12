export type UserRole = "USER" | "ADMIN";
export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

export interface AuthenticatedUser {
  userId: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
      workspaceRole?: WorkspaceRole;
    }
  }
}

export {};
