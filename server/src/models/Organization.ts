import { Schema, model } from "mongoose";

export interface IOrganization {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const organizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  {
    timestamps: true,
  },
);

organizationSchema.index({ slug: 1 }, { unique: true });

export const OrganizationModel = model<IOrganization>("Organization", organizationSchema);
