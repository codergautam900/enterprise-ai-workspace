import path from "node:path";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

type UploadableFile = {
  mimetype: string;
  originalname: string;
  size: number;
  buffer: Buffer;
};

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
]);

const ALLOWED_EXTENSIONS = new Set([".pdf", ".docx", ".txt"]);

export interface StorageUploadResult {
  url: string;
  publicId: string;
}

export function isSupportedDocumentFile(file: Pick<UploadableFile, "mimetype" | "originalname">): boolean {
  const extension = path.extname(file.originalname).toLowerCase();
  return ALLOWED_MIME_TYPES.has(file.mimetype) || ALLOWED_EXTENSIONS.has(extension);
}

export function getFileValidationError(file?: UploadableFile): string | null {
  if (!file) {
    return "File is required";
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "File is too large. Maximum size is 10MB.";
  }

  if (!isSupportedDocumentFile(file)) {
    return "Unsupported file type. Allowed types: PDF, DOCX, TXT.";
  }

  return null;
}

function createStorageError(message: string, status: number): Error & { status: number } {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  return error;
}

export function getPublicIdFromCloudinaryUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname;
    const uploadIndex = pathname.indexOf("/upload/");

    if (uploadIndex === -1) {
      return null;
    }

    const remainingPath = pathname.slice(uploadIndex + "/upload/".length);
    const segments = remainingPath.split("/");

    if (segments.length < 2) {
      return null;
    }

    const firstSegment = segments[0] ?? "";
    const publicIdSegments = firstSegment.startsWith("v") ? segments.slice(1) : segments;
    const publicId = publicIdSegments.join("/");

    if (!publicId) {
      return null;
    }

    return publicId.replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
}

const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudinaryCloudName && cloudinaryApiKey && cloudinaryApiSecret) {
  cloudinary.config({
    cloud_name: cloudinaryCloudName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
  });
}

export async function uploadFile(file: UploadableFile): Promise<StorageUploadResult> {
  const validationError = getFileValidationError(file);

  if (validationError) {
    throw createStorageError(validationError, 400);
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw createStorageError("Cloudinary configuration is missing", 500);
  }

  const extension = path.extname(file.originalname).toLowerCase();
  const baseName = path.basename(file.originalname, extension).replace(/[^a-zA-Z0-9-_]+/g, "-").slice(0, 80) || "document";
  const publicId = `enterprise-ai-documents/${Date.now()}-${baseName}`;

  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "enterprise-ai-documents",
          public_id: publicId,
          use_filename: false,
          unique_filename: true,
        },
        (error, uploadResult) => {
          if (error) {
            reject(error);
            return;
          }

          if (!uploadResult) {
            reject(new Error("Cloudinary upload failed"));
            return;
          }

          resolve(uploadResult);
        },
      );

      uploadStream.end(file.buffer);
    });

    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Document upload failed";
    throw createStorageError(message, 500);
  }
}

export async function deleteFile(publicId: string): Promise<void> {
  if (!publicId) {
    return;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });

    if (result.result !== "ok" && result.result !== "not found") {
      throw new Error("Cloudinary delete failed");
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Document deletion failed";
    throw createStorageError(message, 500);
  }
}
