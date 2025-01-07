import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router = Router();

// Rota para registro
router.post("/register", registerUser);

// Rota para login
router.post("/login", loginUser);

export default router;
