import { Schema, Types, model } from "mongoose";

export interface IWorkspace {
  name: string;
  description?: string | null;
  ownerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: null },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

workspaceSchema.index({ ownerId: 1 });

export const WorkspaceModel = model<IWorkspace>("Workspace", workspaceSchema);
