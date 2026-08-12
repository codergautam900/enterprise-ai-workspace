import axios from "axios";
import mammoth from "mammoth";
import { Types } from "mongoose";
import { DocumentModel, type DocumentStatus } from "../models/Document.js";
import { DocumentChunkModel } from "../models/DocumentChunk.js";
import { ensureDocumentAccess } from "./document.service.js";

const DEFAULT_CHUNK_SIZE = Number(process.env.DOCUMENT_CHUNK_SIZE ?? 1000);
const DEFAULT_CHUNK_OVERLAP = Number(process.env.DOCUMENT_CHUNK_OVERLAP ?? 200);

function createHttpError(message: string, status: number): Error & { status: number } {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  return error;
}

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  // Use the package's exported PDFParse class as provided in the installed version
  const pdfModule = await import("pdf-parse");
  const PDFParse = pdfModule.PDFParse as {
    new (options: { data?: string | ArrayBuffer | Uint8Array | number[] }): { getText: (params?: any) => Promise<{ text: string }> };
  };

  const parser = new PDFParse({ data: buffer });
  const textResult = await parser.getText();
  return textResult?.text ?? "";
}

export async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value || "";
}

export function extractTextFromTxt(buffer: Buffer): string {
  return buffer.toString("utf-8") || "";
}

export function cleanText(text: string): string {
  // Normalize line endings, remove repeated whitespace, trim
  let s = text.replace(/\r\n/g, "\n");
  s = s.replace(/\u00A0/g, " ");
  s = s.replace(/\t/g, " ");
  s = s.replace(/\n{3,}/g, "\n\n"); // collapse multiple empty lines
  s = s.replace(/[ ]{2,}/g, " ");
  s = s.trim();
  return s;
}

export function chunkText(text: string, chunkSize = DEFAULT_CHUNK_SIZE, overlap = DEFAULT_CHUNK_OVERLAP): string[] {
  // Split into paragraphs (preserve paragraph boundaries)
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter((p) => p.length > 0);

  const chunks: string[] = [];
  let current = "";

  for (const para of paragraphs) {
    if (!current) {
      // Start new chunk
      if (para.length <= chunkSize) {
        current = para;
      } else {
        // Paragraph longer than chunkSize: split it by words
        let start = 0;
        while (start < para.length) {
          const part = para.slice(start, start + chunkSize);
          chunks.push(part.trim());
          // move by chunkSize - overlap
          start += chunkSize - overlap;
        }
        current = "";
      }
    } else {
      // Try to append paragraph with a blank line separator
      const candidate = `${current}\n\n${para}`;
      if (candidate.length <= chunkSize) {
        current = candidate;
      } else {
        // finish current chunk
        chunks.push(current.trim());
        // begin new with overlap from end of current
        const overlapText = current.slice(Math.max(0, current.length - overlap));
        // if overlapText starts mid-word, try to trim to nearest space
        let trimmedOverlap = overlapText;
        const firstSpace = trimmedOverlap.indexOf(" ");
        if (firstSpace > 0 && firstSpace < trimmedOverlap.length / 2) {
          trimmedOverlap = trimmedOverlap.slice(firstSpace + 1);
        }
        current = `${trimmedOverlap}\n\n${para}`.trim();

        if (current.length > chunkSize) {
          // if still too big, split current
          let start = 0;
          while (start < current.length) {
            const part = current.slice(start, start + chunkSize);
            chunks.push(part.trim());
            start += chunkSize - overlap;
          }
          current = "";
        }
      }
    }
  }

  if (current) {
    chunks.push(current.trim());
  }

  // Remove empty chunks and trim
  return chunks.map((c) => c.trim()).filter((c) => c.length > 0);
}

export function approximateTokenCount(text: string): number {
  // Rough token estimate = words count
  return text.split(/\s+/).filter(Boolean).length;
}

export async function processDocument(documentId: string, workspaceId: string, userId: string): Promise<void> {
  // ensure user has at least VIEWER membership via existing helper in document.service
  await ensureDocumentAccess(workspaceId, userId, "MEMBER");

  const doc = await DocumentModel.findOne({ _id: new Types.ObjectId(documentId), workspaceId: new Types.ObjectId(workspaceId) }).exec();

  if (!doc) {
    throw createHttpError("Document not found", 404);
  }

  if (!doc.fileUrl) {
    throw createHttpError("Document has no file URL", 400);
  }

  // mark as PROCESSING
  doc.status = "PROCESSING" as DocumentStatus;
  await doc.save();

  try {
    const response = await axios.get<ArrayBuffer>(doc.fileUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data as ArrayBuffer);

    let extracted = "";
    const mime = doc.mimeType?.toLowerCase() ?? "";

    if (mime.includes("pdf") || (doc.fileName && doc.fileName.toLowerCase().endsWith(".pdf"))) {
      extracted = await extractTextFromPdf(buffer);
    } else if (mime.includes("officedocument.wordprocessingml.document") || (doc.fileName && doc.fileName.toLowerCase().endsWith(".docx"))) {
      extracted = await extractTextFromDocx(buffer);
    } else if (mime.includes("text") || (doc.fileName && doc.fileName.toLowerCase().endsWith(".txt"))) {
      extracted = extractTextFromTxt(buffer);
    } else {
      // unknown type: try fallback to txt
      extracted = extractTextFromTxt(buffer);
    }

    const cleaned = cleanText(extracted);

    const chunkSize = Number(process.env.DOCUMENT_CHUNK_SIZE ?? DEFAULT_CHUNK_SIZE);
    const chunkOverlap = Number(process.env.DOCUMENT_CHUNK_OVERLAP ?? DEFAULT_CHUNK_OVERLAP);

    const chunks = chunkText(cleaned, chunkSize, chunkOverlap);

    if (chunks.length === 0) {
      // mark as FAILED
      doc.status = "FAILED" as DocumentStatus;
      await doc.save();
      throw createHttpError("No content extracted from document", 500);
    }

    // delete existing chunks for this document (idempotent)
    await DocumentChunkModel.deleteMany({ documentId: doc._id }).exec();

    const docsToInsert = chunks.map((content, idx) => ({
      documentId: doc._id,
      content,
      chunkIndex: idx,
      tokenCount: approximateTokenCount(content),
    }));

    if (docsToInsert.length > 0) {
      await DocumentChunkModel.insertMany(docsToInsert);
    }

    doc.status = "READY" as DocumentStatus;
    await doc.save();
  } catch (error) {
    // mark as FAILED and rethrow
    try {
      const d = await DocumentModel.findById(doc._id).exec();
      if (d) {
        d.status = "FAILED" as DocumentStatus;
        await d.save();
      }
    } catch {
      // ignore
    }

    if (error instanceof Error) {
      throw createHttpError(error.message, (error as any).status ?? 500);
    }

    throw createHttpError("Document processing failed", 500);
  }
}

export async function getDocumentChunks(documentId: string, workspaceId: string, userId: string): Promise<{ chunkIndex: number; content: string; tokenCount: number }[]> {
  await ensureDocumentAccess(workspaceId, userId, "VIEWER");

  const chunks = await DocumentChunkModel.find({ documentId: new Types.ObjectId(documentId) })
    .sort({ chunkIndex: 1 })
    .lean()
    .exec();

  return chunks.map((c) => ({ chunkIndex: c.chunkIndex, content: c.content, tokenCount: c.tokenCount }));
}
