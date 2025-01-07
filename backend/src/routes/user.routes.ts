// Rotas (users.routes.ts)
import { Router } from "express";
import { validateUserRegistration, validateUserLogin, handleValidationErrors } from "../middleware/usersValidations";
import { registerUser, loginUser, getUser, getUsers } from "../controllers/users.controller";
import { handleCriptPassword  } from "../middleware/criptData";
import { authenticateToken } from "../middleware/authMiddleware";
const router = Router();

// Rota aberta (sem autenticação): Retorna todos os usuários
router.get("/", getUsers);

// Rota protegida: Retorna um usuário específico (autenticação necessária)
router.get("/:email", authenticateToken, getUser);


router.post("/register", validateUserRegistration, handleValidationErrors, handleCriptPassword , registerUser);
router.post("/login", validateUserLogin, handleValidationErrors, loginUser);



// Exemplo de rota protegida
// router.get("/profile", authenticateToken, (req, res) => {
//   res.json({ message: "Bem-vindo!", user: req.user });
// });

export default router;
