import { Router } from "express";
const router = Router();
router.get("/login", (req, res) => {
    res.send("Auth");
})
router.get("/registration", (req, res) => {
    res.send("registration");
})
router.get("/logout", (req, res) => {
    res.send("logout");
})



export default router;

// ========== http://localhost:3000/api/auth/login ====