import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  createDocument,
  deleteDocument,
  getDocumentById,
  getWorkspaceDocuments,
  updateDocumentMetadata,
} from "../services/document.service.js";

export async function createDocumentController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
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
    const { title, description, fileName, fileUrl, mimeType, fileSize, status } = req.body as {
      title?: string;
      description?: string;
      fileName?: string;
      fileUrl?: string;
      mimeType?: string;
      fileSize?: number;
      status?: string;
    };

    const documentInput: {
      title: string;
      description?: string;
      fileName?: string;
      fileUrl?: string;
      mimeType?: string;
      fileSize?: number;
      status?: string;
    } = { title: title ?? "" };

    if (description !== undefined) {
      documentInput.description = description;
    }

    if (fileName !== undefined) {
      documentInput.fileName = fileName;
    }

    if (fileUrl !== undefined) {
      documentInput.fileUrl = fileUrl;
    }

    if (mimeType !== undefined) {
      documentInput.mimeType = mimeType;
    }

    if (fileSize !== undefined) {
      documentInput.fileSize = fileSize;
    }

    if (status !== undefined) {
      documentInput.status = status;
    }

    const document = await createDocument(workspaceId, user.userId, documentInput);

    return res.status(201).json({ success: true, data: { document } });
  } catch (error) {
    return next(error);
  }
}

export async function listDocumentsController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    const workspaceId = Array.isArray(req.params.workspaceId)
      ? req.params.workspaceId[0] ?? ""
      : req.params.workspaceId ?? "";
    const documents = await getWorkspaceDocuments(workspaceId, user.userId);

    return res.status(200).json({ success: true, data: { documents } });
  } catch (error) {
    return next(error);
  }
}

export async function getDocumentController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    const workspaceId = Array.isArray(req.params.workspaceId)
      ? req.params.workspaceId[0] ?? ""
      : req.params.workspaceId ?? "";
    const documentId = Array.isArray(req.params.documentId)
      ? req.params.documentId[0] ?? ""
      : req.params.documentId ?? "";
    const document = await getDocumentById(workspaceId, documentId, user.userId);

    return res.status(200).json({ success: true, data: { document } });
  } catch (error) {
    return next(error);
  }
}

export async function updateDocumentController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
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
    const documentId = Array.isArray(req.params.documentId)
      ? req.params.documentId[0] ?? ""
      : req.params.documentId ?? "";
    const { title, description, fileName, fileUrl, mimeType, fileSize, status } = req.body as {
      title?: string;
      description?: string | null;
      fileName?: string | null;
      fileUrl?: string | null;
      mimeType?: string | null;
      fileSize?: number | null;
      status?: string;
    };

    const documentInput: {
      title?: string;
      description?: string | null;
      fileName?: string | null;
      fileUrl?: string | null;
      mimeType?: string | null;
      fileSize?: number | null;
      status?: string;
    } = {};

    if (title !== undefined) {
      documentInput.title = title;
    }

    if (description !== undefined) {
      documentInput.description = description;
    }

    if (fileName !== undefined) {
      documentInput.fileName = fileName;
    }

    if (fileUrl !== undefined) {
      documentInput.fileUrl = fileUrl;
    }

    if (mimeType !== undefined) {
      documentInput.mimeType = mimeType;
    }

    if (fileSize !== undefined) {
      documentInput.fileSize = fileSize;
    }

    if (status !== undefined) {
      documentInput.status = status;
    }

    const document = await updateDocumentMetadata(workspaceId, documentId, user.userId, documentInput);

    return res.status(200).json({ success: true, data: { document } });
  } catch (error) {
    return next(error);
  }
}

export async function deleteDocumentController(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    const workspaceId = Array.isArray(req.params.workspaceId)
      ? req.params.workspaceId[0] ?? ""
      : req.params.workspaceId ?? "";
    const documentId = Array.isArray(req.params.documentId)
      ? req.params.documentId[0] ?? ""
      : req.params.documentId ?? "";
    const document = await deleteDocument(workspaceId, documentId, user.userId);

    return res.status(200).json({ success: true, data: { document } });
  } catch (error) {
    return next(error);
  }
}
