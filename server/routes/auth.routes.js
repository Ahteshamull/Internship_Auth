import { Router } from "express";
import { login, logout, registration } from "../controller/auth.js";
const router = Router();
router.get("/login", login);
router.get("/registration", registration);
router.get("/logout", logout);

export default router;

// ========== http://localhost:3000/api/auth/login ====
