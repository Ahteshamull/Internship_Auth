import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  registration,
  verifyEmail,
  resetPassword,
} from "../controller/auth.js";
const router = Router();
router.post("/login", login);
router.post("/registration", registration);
router.post("/logout", logout);

router.post ("/verify-email",verifyEmail)
router.post ("/forgot-password",forgotPassword)
router.post ("/reset-password/:resetPasswordToken",resetPassword)


export default router;

// ========== http://localhost:3000/api/auth/login ====
