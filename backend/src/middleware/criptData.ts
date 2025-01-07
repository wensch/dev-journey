import { Request, Response, NextFunction } from "express";
import bcrypt  from "bcrypt"
 
const saltRounds = 10;


export const handleCriptPassword  = async (req: Request, res: Response, next: NextFunction) => {

  if (req.body.senha) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.senha, saltRounds)
      req.body.senha = hashedPassword

      console.log('senha criptografada', req.body);
      
    } catch (error) {
      res.status(500).json({message: 'Erro ao criptografar a senha'})
      return
    }
  }
  
  next();
};
