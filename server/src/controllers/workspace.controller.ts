import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  createWorkspace,
  deleteWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
  updateWorkspace,
} from "../services/workspace.service.js";

export async function createWorkspaceController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      return res.status(400).json({ success: false, message: firstError?.msg || "Invalid input" });
    }

    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    const { name, description } = req.body as { name?: string; description?: string };
    const workspaceInput: { name: string; description?: string } = { name: name ?? "" };

    if (description !== undefined) {
      workspaceInput.description = description;
    }

    const workspace = await createWorkspace(user.userId, workspaceInput);

    return res.status(201).json({ success: true, data: { workspace } });
  } catch (error) {
    return next(error);
  }
}

export async function listWorkspacesController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    const workspaces = await getUserWorkspaces(user.userId);

    return res.status(200).json({ success: true, data: { workspaces } });
  } catch (error) {
    return next(error);
  }
}

export async function getWorkspaceController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    const workspaceId = Array.isArray(req.params.workspaceId)
      ? req.params.workspaceId[0] ?? ""
      : req.params.workspaceId ?? "";
    const workspace = await getWorkspaceById(workspaceId, user.userId);

    return res.status(200).json({ success: true, data: { workspace } });
  } catch (error) {
    return next(error);
  }
}

export async function updateWorkspaceController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      return res.status(400).json({ success: false, message: firstError?.msg || "Invalid input" });
    }

    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    const workspaceId = Array.isArray(req.params.workspaceId)
      ? req.params.workspaceId[0] ?? ""
      : req.params.workspaceId ?? "";
    const { name, description } = req.body as { name?: string; description?: string | null };
    const updateInput: { name?: string; description?: string | null } = {};

    if (name !== undefined) {
      updateInput.name = name;
    }

    if (description !== undefined) {
      updateInput.description = description;
    }

    const workspace = await updateWorkspace(workspaceId, user.userId, updateInput);

    return res.status(200).json({ success: true, data: { workspace } });
  } catch (error) {
    return next(error);
  }
}

export async function deleteWorkspaceController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    const workspaceId = Array.isArray(req.params.workspaceId)
      ? req.params.workspaceId[0] ?? ""
      : req.params.workspaceId ?? "";
    const workspace = await deleteWorkspace(workspaceId, user.userId);

    return res.status(200).json({ success: true, data: { workspace } });
  } catch (error) {
    return next(error);
  }
}
