import { Schema, model } from "mongoose";

export type DocumentStatus = "UPLOADING" | "PROCESSING" | "READY" | "FAILED";

export interface IDocument {
  workspaceId: Schema.Types.ObjectId;
  uploadedById: Schema.Types.ObjectId;
  title: string;
  description?: string | null;
  fileName: string;
  mimeType: string;
  fileSize: number;
  storageKey: string;
  status: DocumentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema<IDocument>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    uploadedById: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: null },
    fileName: { type: String, required: true, trim: true },
    mimeType: { type: String, required: true, trim: true },
    fileSize: { type: Number, required: true },
    storageKey: { type: String, required: true, trim: true },
    status: {
      type: String,
      required: true,
      enum: ["UPLOADING", "PROCESSING", "READY", "FAILED"],
      default: "UPLOADING",
    },
  },
  {
    timestamps: true,
  },
);

documentSchema.index({ workspaceId: 1 });

export const DocumentModel = model<IDocument>("Document", documentSchema);
