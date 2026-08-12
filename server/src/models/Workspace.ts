import { Schema, model } from "mongoose";

export interface IWorkspace {
  organizationId: Schema.Types.ObjectId;
  name: string;
  slug: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true, default: null },
  },
  {
    timestamps: true,
  },
);

workspaceSchema.index({ organizationId: 1 });

export const WorkspaceModel = model<IWorkspace>("Workspace", workspaceSchema);
