import type { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { WorkspaceMemberModel, type WorkspaceMemberRole } from "../models/WorkspaceMember.js";

export const WORKSPACE_ROLE_PRIORITY: Record<WorkspaceMemberRole, number> = {
  VIEWER: 1,
  MEMBER: 2,
  ADMIN: 3,
  OWNER: 4,
};

export function hasWorkspacePermission(role: WorkspaceMemberRole, minimumRequiredRole: WorkspaceMemberRole): boolean {
  return WORKSPACE_ROLE_PRIORITY[role] >= WORKSPACE_ROLE_PRIORITY[minimumRequiredRole];
}

export async function getWorkspaceRole(workspaceId: string, userId: string): Promise<WorkspaceMemberRole> {
  const membership = await WorkspaceMemberModel.findOne({
    workspaceId: new Types.ObjectId(workspaceId),
    userId: new Types.ObjectId(userId),
  })
    .lean()
    .exec();

  if (!membership) {
    throw Object.assign(new Error("Workspace not found"), { status: 404 });
  }

  return membership.role as WorkspaceMemberRole;
}

export function requireWorkspacePermission(minimumRequiredRole: WorkspaceMemberRole) {
  return async function requireWorkspacePermissionMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    const workspaceId = Array.isArray(req.params.workspaceId) ? req.params.workspaceId[0] : req.params.workspaceId ?? "";

    if (!workspaceId) {
      return res.status(400).json({ success: false, message: "Invalid workspace id" });
    }

    try {
      const role = await getWorkspaceRole(workspaceId, user.userId);

      if (!hasWorkspacePermission(role, minimumRequiredRole)) {
        return res.status(403).json({ success: false, message: "Insufficient permission" });
      }

      req.workspaceRole = role;
      return next();
    } catch (error) {
      const status = (error as Error & { status?: number }).status ?? 500;
      const message = (error as Error).message || "Internal server error";
      return res.status(status).json({ success: false, message });
    }
  };
}
