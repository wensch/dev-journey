// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwtConfig";

export interface JwtPayload {
  id: number;
  email: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token não fornecido ou inválido." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded; // Aqui estamos atribuindo apenas o id e email, que é o que está no token
    next();
  } catch (error) {
    console.error("Erro ao verificar o token:", error);
    res.status(403).json({ error: "Token Inválido ou Expirado" });
  }
};