import { Request, Response } from "express";

// Rota para registrar um novo usuário
export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // TODO: lógica de registro (ex.: salvar no banco de dados)
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

// Rota para login de usuário
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // TODO: lógica de login (ex.: autenticação, gerar JWT)
    res.status(200).json({ token: "token-de-exemplo" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};
