import { Router } from "express";
import { login, logout, registration, verifyEmail } from "../controller/auth.js";
const router = Router();
router.post("/login", login);
router.post("/registration", registration);
router.post("/logout", logout);

router.post ("/verify-email",verifyEmail)


export default router;

// ========== http://localhost:3000/api/auth/login ====
