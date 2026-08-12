import { Schema, Types, model } from "mongoose";

export type WorkspaceMemberRole = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

export interface IWorkspaceMember {
  workspaceId: Types.ObjectId;
  userId: Types.ObjectId;
  role: WorkspaceMemberRole;
  createdAt: Date;
  updatedAt: Date;
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
    timestamps: true,
  },
);

workspaceMemberSchema.index({ workspaceId: 1 });
workspaceMemberSchema.index({ userId: 1 });
workspaceMemberSchema.index({ workspaceId: 1, userId: 1 }, { unique: true });

export const WorkspaceMemberModel = model<IWorkspaceMember>("WorkspaceMember", workspaceMemberSchema);
