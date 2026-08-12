import { Schema, Types, model } from "mongoose";

export type DocumentStatus = "UPLOADED" | "PROCESSING" | "READY" | "FAILED";

export interface IDocument {
  workspaceId: Types.ObjectId;
  uploadedBy: Types.ObjectId;
  title: string;
  description?: string | null;
  fileName?: string | null;
  fileUrl?: string | null;
  mimeType?: string | null;
  fileSize?: number | null;
  status: DocumentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema<IDocument>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: null },
    fileName: { type: String, trim: true, default: null },
    fileUrl: { type: String, trim: true, default: null },
    mimeType: { type: String, trim: true, default: null },
    fileSize: { type: Number, default: null },
    status: {
      type: String,
      required: true,
      enum: ["UPLOADED", "PROCESSING", "READY", "FAILED"],
      default: "UPLOADED",
    },
  },
  {
    timestamps: true,
  },
);

documentSchema.index({ workspaceId: 1 });
documentSchema.index({ uploadedBy: 1 });

export const DocumentModel = model<IDocument>("Document", documentSchema);
