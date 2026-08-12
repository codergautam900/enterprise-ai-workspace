import { Types } from "mongoose";
import { DocumentModel, type DocumentStatus, type IDocument } from "../models/Document.js";
import { WorkspaceMemberModel } from "../models/WorkspaceMember.js";
import { hasWorkspacePermission } from "../middleware/workspaceAccess.js";
import { deleteFile, getPublicIdFromCloudinaryUrl } from "./storage.service.js";

const ALLOWED_DOCUMENT_STATUSES: DocumentStatus[] = ["UPLOADED", "PROCESSING", "READY", "FAILED"];

function createHttpError(message: string, status: number): Error & { status: number } {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  return error;
}

export type DocumentRecord = IDocument & { _id: string };

async function ensureDocumentAccess(workspaceId: string, userId: string, minimumRole: "VIEWER" | "MEMBER" | "ADMIN") {
  const membership = await WorkspaceMemberModel.findOne({
    workspaceId: new Types.ObjectId(workspaceId),
    userId: new Types.ObjectId(userId),
  })
    .lean()
    .exec();

  if (!membership) {
    throw createHttpError("Workspace not found", 404);
  }

  const role = membership.role as "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

  if (!hasWorkspacePermission(role, minimumRole)) {
    throw createHttpError("Insufficient permission", 403);
  }

  return role;
}

export async function createDocument(
  workspaceId: string,
  userId: string,
  data: {
    title: string;
    description?: string;
    fileName?: string;
    fileUrl?: string;
    mimeType?: string;
    fileSize?: number;
    status?: string;
  },
): Promise<DocumentRecord> {
  await ensureDocumentAccess(workspaceId, userId, "MEMBER");

  const title = data.title.trim();

  if (!title) {
    throw createHttpError("Document title is required", 400);
  }

  const statusValue = (data.status ?? "UPLOADED") as DocumentStatus;

  if (!ALLOWED_DOCUMENT_STATUSES.includes(statusValue)) {
    throw createHttpError("Invalid document status", 400);
  }

  const documentPayload: {
    workspaceId: Types.ObjectId;
    uploadedBy: Types.ObjectId;
    title: string;
    description?: string | null;
    fileName?: string | null;
    fileUrl?: string | null;
    mimeType?: string | null;
    fileSize?: number | null;
    status: DocumentStatus;
  } = {
    workspaceId: new Types.ObjectId(workspaceId),
    uploadedBy: new Types.ObjectId(userId),
    title,
    status: statusValue,
  };

  if (data.description !== undefined) {
    documentPayload.description = data.description.trim() || null;
  }

  if (data.fileName !== undefined) {
    documentPayload.fileName = data.fileName.trim() || null;
  }

  if (data.fileUrl !== undefined) {
    documentPayload.fileUrl = data.fileUrl.trim() || null;
  }

  if (data.mimeType !== undefined) {
    documentPayload.mimeType = data.mimeType.trim() || null;
  }

  if (data.fileSize !== undefined) {
    documentPayload.fileSize = data.fileSize ?? null;
  }

  const document = await DocumentModel.create(documentPayload);

  return document.toObject() as unknown as DocumentRecord;
}

export async function getWorkspaceDocuments(workspaceId: string, userId: string): Promise<DocumentRecord[]> {
  await ensureDocumentAccess(workspaceId, userId, "VIEWER");

  const documents = await DocumentModel.find({ workspaceId: new Types.ObjectId(workspaceId) })
    .sort({ updatedAt: -1 })
    .lean()
    .exec();

  return documents as unknown as DocumentRecord[];
}

export async function getDocumentById(workspaceId: string, documentId: string, userId: string): Promise<DocumentRecord> {
  await ensureDocumentAccess(workspaceId, userId, "VIEWER");

  const document = await DocumentModel.findOne({
    _id: new Types.ObjectId(documentId),
    workspaceId: new Types.ObjectId(workspaceId),
  }).exec();

  if (!document) {
    throw createHttpError("Document not found", 404);
  }

  return document.toObject() as unknown as DocumentRecord;
}

export async function updateDocumentMetadata(
  workspaceId: string,
  documentId: string,
  userId: string,
  data: {
    title?: string;
    description?: string | null;
    fileName?: string | null;
    fileUrl?: string | null;
    mimeType?: string | null;
    fileSize?: number | null;
    status?: string;
  },
): Promise<DocumentRecord> {
  await ensureDocumentAccess(workspaceId, userId, "ADMIN");

  const update: Partial<{
    title: string;
    description: string | null;
    fileName: string | null;
    fileUrl: string | null;
    mimeType: string | null;
    fileSize: number | null;
    status: DocumentStatus;
  }> = {};

  if (data.title !== undefined) {
    const title = data.title.trim();

    if (!title) {
      throw createHttpError("Document title is required", 400);
    }

    update.title = title;
  }

  if (data.description !== undefined) {
    update.description = data.description?.trim() || null;
  }

  if (data.fileName !== undefined) {
    update.fileName = data.fileName?.trim() || null;
  }

  if (data.fileUrl !== undefined) {
    update.fileUrl = data.fileUrl?.trim() || null;
  }

  if (data.mimeType !== undefined) {
    update.mimeType = data.mimeType?.trim() || null;
  }

  if (data.fileSize !== undefined) {
    update.fileSize = data.fileSize ?? null;
  }

  if (data.status !== undefined) {
    const normalizedStatus = data.status as DocumentStatus;

    if (!ALLOWED_DOCUMENT_STATUSES.includes(normalizedStatus)) {
      throw createHttpError("Invalid document status", 400);
    }

    update.status = normalizedStatus;
  }

  const document = await DocumentModel.findOneAndUpdate(
    {
      _id: new Types.ObjectId(documentId),
      workspaceId: new Types.ObjectId(workspaceId),
    },
    update,
    { new: true },
  ).exec();

  if (!document) {
    throw createHttpError("Document not found", 404);
  }

  return document.toObject() as unknown as DocumentRecord;
}

export async function deleteDocument(workspaceId: string, documentId: string, userId: string): Promise<DocumentRecord> {
  await ensureDocumentAccess(workspaceId, userId, "ADMIN");

  const existingDocument = await DocumentModel.findOne({
    _id: new Types.ObjectId(documentId),
    workspaceId: new Types.ObjectId(workspaceId),
  }).exec();

  if (!existingDocument) {
    throw createHttpError("Document not found", 404);
  }

  const publicId = existingDocument.fileUrl ? getPublicIdFromCloudinaryUrl(existingDocument.fileUrl) : null;

  if (publicId) {
    await deleteFile(publicId);
  }

  const document = await DocumentModel.findOneAndDelete({
    _id: new Types.ObjectId(documentId),
    workspaceId: new Types.ObjectId(workspaceId),
  }).exec();

  if (!document) {
    throw createHttpError("Document not found", 404);
  }

  return document.toObject() as unknown as DocumentRecord;
}
