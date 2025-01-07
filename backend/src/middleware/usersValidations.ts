import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateUserRegistration = [
  body("email").isEmail().withMessage("E-mail inválido"),
  body("cpf").isLength({ min: 11, max: 11 }).withMessage("CPF deve ter 11 caracteres"),
  body("telefone").isLength({ min: 8, max: 12 }).notEmpty().withMessage("Telefone é obrigatório"),
  body("senha").isLength({ min: 6 }).withMessage("Senha deve ter pelo menos 6 caracteres"),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return
  }
  next();
};

export const validateUserLogin = [
  body("email").isEmail().withMessage("E-mail inválido"),
  body("senha").isLength({ min: 6 }).withMessage("Senha deve ter pelo menos 6 caracteres"),
];