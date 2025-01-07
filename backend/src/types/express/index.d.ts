export interface User {
  id: number;
  name: string;
  email: string;
  cpf: string;
  telefone: string;
  senha: string;
}

export interface JwtPayload {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};