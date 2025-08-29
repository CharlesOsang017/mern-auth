import express from "express";
import { validateRequest } from "zod-express-middleware";
import {
  loginSchema,
  registerSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
} from "../libs/validate-schema.js";
import {
  registerUser,
  loginUser,
  requestPasswordReset,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
  "/register",
  validateRequest({ body: registerSchema }),
  registerUser
);

router.post("/login", validateRequest({ body: loginSchema }), loginUser);
router.post(
  "/request-password-reset",
  validateRequest({ body: requestPasswordResetSchema }),
  requestPasswordReset
);
router.post(
  "/reset-password",
  validateRequest({ body: resetPasswordSchema }),
  resetPassword
);
export default router;
