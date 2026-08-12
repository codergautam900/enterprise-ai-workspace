import { Router } from "express";
import { body } from "express-validator";
import {
  loginController,
  logoutController,
  meController,
  registerController,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  registerController,
);

router.post(
  "/login",
  body("email").trim().isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  loginController,
);

router.post("/logout", logoutController);
router.get("/me", authMiddleware, meController);

export default router;
