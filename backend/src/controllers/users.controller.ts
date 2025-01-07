import { NextFunction, Request, Response } from "express";
import db from "../../db";
import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwtConfig";
import { User } from "../types/express/index";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, cpf, telefone, senha } = req.body;

  try {
    const user = await db("users").insert({
      name,
      email,
      cpf,
      telefone,
      senha
      });

    res.status(201).json({ message: "USUARIO registrado com sucesso!", user });
  } catch (error) {
    console.error("Erro ao registrar USUARIO:", error);
    res.status(500).json({ error: "Erro ao registrar USUARIO" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, senha } = req.body;
  try {
    const user = await db("users").where({ email }).first();

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    // Comparar senha
    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Credenciais inválidas." });
      return;
    }

    // Gerar o token JWT

    const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    })

    res.status(200).json({ message: "Login realizado com sucesso.", token, user: {id: user.id, email: user.email, nome: user.name} });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro interno ao fazer login" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const email = req.params.email ||  req.user?.email;

  try {

    if (!email) {
      res.status(400).json({ message: "E-mail não fornecido." });
      return
    }

    const user = await db<User>("users").where({ email }).first();

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }

    const { senha, ...userWithoutPassword } = user;

    res.status(200).json({ message: "Usuário encontrado", userWithoutPassword });
  } catch (error) {
    console.error("Erro ao encontrar usuário:", error);
    res.status(500).json({ error: "Erro ao encontrar usuário" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db("users").select("id", "email", "name", "cpf", "telefone"); // Customize os campos que deseja retornar
    res.status(200).json({ users });
    return 
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários." });
    return 
  }
};