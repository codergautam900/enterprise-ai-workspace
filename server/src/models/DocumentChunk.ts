import { Schema, model } from "mongoose";

export interface IDocumentChunk {
  documentId: Schema.Types.ObjectId;
  content: string;
  chunkIndex: number;
  tokenCount: number;
  createdAt: Date;
}

const documentChunkSchema = new Schema<IDocumentChunk>(
  {
    documentId: { type: Schema.Types.ObjectId, ref: "Document", required: true },
    content: { type: String, required: true },
    chunkIndex: { type: Number, required: true },
    tokenCount: { type: Number, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

documentChunkSchema.index({ documentId: 1, chunkIndex: 1 }, { unique: true });

export const DocumentChunkModel = model<IDocumentChunk>("DocumentChunk", documentChunkSchema);
