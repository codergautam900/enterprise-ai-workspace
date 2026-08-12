import { Types } from "mongoose";
import { DocumentModel } from "../models/Document.js";
import { WorkspaceModel, type IWorkspace } from "../models/Workspace.js";
import { WorkspaceMemberModel, type WorkspaceMemberRole } from "../models/WorkspaceMember.js";
import { hasWorkspacePermission } from "../middleware/workspaceAccess.js";

export type WorkspaceRecord = IWorkspace & { _id: string };

function createHttpError(message: string, status: number): Error & { status: number } {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  return error;
}

export async function ensureWorkspaceAccess(
  workspaceId: string,
  userId: string,
  minimumRole: WorkspaceMemberRole,
): Promise<WorkspaceMemberRole> {
  const membership = await WorkspaceMemberModel.findOne({
    workspaceId: new Types.ObjectId(workspaceId),
    userId: new Types.ObjectId(userId),
  })
    .lean()
    .exec();

  if (!membership) {
    throw createHttpError("Workspace not found", 404);
  }

  const role = membership.role as WorkspaceMemberRole;

  if (!hasWorkspacePermission(role, minimumRole)) {
    throw createHttpError("Insufficient permission", 403);
  }

  return role;
}

export async function createWorkspace(
  userId: string,
  data: { name: string; description?: string },
): Promise<WorkspaceRecord> {
  const name = data.name.trim();

  if (!name) {
    throw createHttpError("Workspace name is required", 400);
  }

  const workspacePayload: { name: string; description?: string | null; ownerId: Types.ObjectId } = {
    name,
    ownerId: new Types.ObjectId(userId),
  };

  if (data.description !== undefined) {
    workspacePayload.description = data.description.trim() || null;
  }

  const workspace = await WorkspaceModel.create(workspacePayload);

  await WorkspaceMemberModel.create({
    workspaceId: new Types.ObjectId(workspace._id.toString()),
    userId: new Types.ObjectId(userId),
    role: "OWNER",
  });

  return workspace.toObject() as unknown as WorkspaceRecord;
}

export async function getUserWorkspaces(userId: string): Promise<WorkspaceRecord[]> {
  const memberships = await WorkspaceMemberModel.find({
    userId: new Types.ObjectId(userId),
  })
    .lean()
    .exec();

  if (memberships.length === 0) {
    return [];
  }

  const workspaceIds = memberships.map((membership) => membership.workspaceId.toString());

  const workspaces = await WorkspaceModel.find({ _id: { $in: workspaceIds } })
    .sort({ updatedAt: -1 })
    .lean()
    .exec();

  return workspaces as unknown as WorkspaceRecord[];
}

export async function getWorkspaceById(workspaceId: string, userId: string): Promise<WorkspaceRecord> {
  const workspace = await WorkspaceModel.findById(new Types.ObjectId(workspaceId)).exec();

  if (!workspace) {
    throw createHttpError("Workspace not found", 404);
  }

  const membership = await WorkspaceMemberModel.findOne({
    workspaceId: new Types.ObjectId(workspaceId),
    userId: new Types.ObjectId(userId),
  })
    .lean()
    .exec();

  if (!membership) {
    throw createHttpError("Workspace not found", 404);
  }

  return workspace.toObject() as unknown as WorkspaceRecord;
}

export async function updateWorkspace(
  workspaceId: string,
  userId: string,
  data: { name?: string; description?: string | null },
): Promise<WorkspaceRecord> {
  await ensureWorkspaceAccess(workspaceId, userId, "ADMIN");

  const update: Partial<{ name: string; description: string | null }> = {};

  if (data.name !== undefined) {
    const name = data.name.trim();

    if (!name) {
      throw createHttpError("Workspace name is required", 400);
    }

    update.name = name;
  }

  if (data.description !== undefined) {
    update.description = data.description?.trim() || null;
  }

  const workspace = await WorkspaceModel.findByIdAndUpdate(new Types.ObjectId(workspaceId), update, {
    new: true,
  }).exec();

  if (!workspace) {
    throw createHttpError("Workspace not found", 404);
  }

  return workspace.toObject() as unknown as WorkspaceRecord;
}

export async function deleteWorkspace(workspaceId: string, userId: string): Promise<WorkspaceRecord> {
  await ensureWorkspaceAccess(workspaceId, userId, "OWNER");

  const workspace = await WorkspaceModel.findByIdAndDelete(new Types.ObjectId(workspaceId)).exec();

  if (!workspace) {
    throw createHttpError("Workspace not found", 404);
  }

  await Promise.all([
    WorkspaceMemberModel.deleteMany({ workspaceId: new Types.ObjectId(workspaceId) }).exec(),
    DocumentModel.deleteMany({ workspaceId: new Types.ObjectId(workspaceId) }).exec(),
  ]);

  return workspace.toObject() as unknown as WorkspaceRecord;
}
