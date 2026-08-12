import { Schema, model } from "mongoose";

export type WorkspaceMemberRole = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

export interface IWorkspaceMember {
  workspaceId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  role: WorkspaceMemberRole;
  createdAt: Date;
}

const workspaceMemberSchema = new Schema<IWorkspaceMember>(
  {
    workspaceId: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: {
      type: String,
      required: true,
      enum: ["OWNER", "ADMIN", "MEMBER", "VIEWER"],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

workspaceMemberSchema.index({ workspaceId: 1, userId: 1 }, { unique: true });

export const WorkspaceMemberModel = model<IWorkspaceMember>("WorkspaceMember", workspaceMemberSchema);
