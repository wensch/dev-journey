import { User } from "../models/user"; // Ajuste conforme necessário

declare global {
  namespace Express {
    export interface Request {
      user?: User; // Defina a propriedade user como sendo do tipo User, ou como o tipo que você está utilizando
    }
  }
}
