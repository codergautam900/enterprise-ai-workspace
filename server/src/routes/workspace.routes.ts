import { Router } from "express";
import { body, param } from "express-validator";
import {
  createWorkspaceController,
  deleteWorkspaceController,
  getWorkspaceController,
  listWorkspacesController,
  updateWorkspaceController,
} from "../controllers/workspace.controller.js";
import {
  createDocumentController,
  deleteDocumentController,
  getDocumentController,
  listDocumentsController,
  updateDocumentController,
} from "../controllers/document.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { requireWorkspacePermission } from "../middleware/workspaceAccess.js";

const router = Router();

router.use(authMiddleware);

router.post(
  "/",
  body("name").trim().notEmpty().withMessage("Workspace name is required"),
  body("description").optional().trim(),
  createWorkspaceController,
);

router.get("/", listWorkspacesController);

router.get(
  "/:workspaceId",
  param("workspaceId").isMongoId().withMessage("Invalid workspace id"),
  requireWorkspacePermission("VIEWER"),
  getWorkspaceController,
);

router.patch(
  "/:workspaceId",
  param("workspaceId").isMongoId().withMessage("Invalid workspace id"),
  body("name").optional().trim().notEmpty().withMessage("Workspace name is required"),
  body("description").optional({ values: "falsy" }).trim(),
  requireWorkspacePermission("ADMIN"),
  updateWorkspaceController,
);

router.delete(
  "/:workspaceId",
  param("workspaceId").isMongoId().withMessage("Invalid workspace id"),
  requireWorkspacePermission("OWNER"),
  deleteWorkspaceController,
);

router.post(
  "/:workspaceId/documents",
  param("workspaceId").isMongoId().withMessage("Invalid workspace id"),
  body("title").trim().notEmpty().withMessage("Document title is required"),
  body("status").optional().isIn(["UPLOADED", "PROCESSING", "READY", "FAILED"]).withMessage("Invalid document status"),
  requireWorkspacePermission("MEMBER"),
  createDocumentController,
);

router.get(
  "/:workspaceId/documents",
  param("workspaceId").isMongoId().withMessage("Invalid workspace id"),
  requireWorkspacePermission("VIEWER"),
  listDocumentsController,
);

router.get(
  "/:workspaceId/documents/:documentId",
  param("workspaceId").isMongoId().withMessage("Invalid workspace id"),
  param("documentId").isMongoId().withMessage("Invalid document id"),
  requireWorkspacePermission("VIEWER"),
  getDocumentController,
);

router.patch(
  "/:workspaceId/documents/:documentId",
  param("workspaceId").isMongoId().withMessage("Invalid workspace id"),
  param("documentId").isMongoId().withMessage("Invalid document id"),
  body("title").optional().trim().notEmpty().withMessage("Document title is required"),
  body("status").optional().isIn(["UPLOADED", "PROCESSING", "READY", "FAILED"]).withMessage("Invalid document status"),
  requireWorkspacePermission("ADMIN"),
  updateDocumentController,
);

router.delete(
  "/:workspaceId/documents/:documentId",
  param("workspaceId").isMongoId().withMessage("Invalid workspace id"),
  param("documentId").isMongoId().withMessage("Invalid document id"),
  requireWorkspacePermission("ADMIN"),
  deleteDocumentController,
);

export default router;
