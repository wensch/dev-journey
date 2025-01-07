import { Request, Response } from "express";
import db from "../../db";

export const registerCharacter = async (req: Request, res: Response) => {
  const { name, image, type, attributes } = req.body;

  try {
    const character = await db("characters").insert({
      name,
      image,
      type,
      vitality: attributes.vitality,
      mind: attributes.mind,
      tenacity: attributes.tenacity,
      strength: attributes.strength,
      dexterity: attributes.dexterity,
      intelligence: attributes.intelligence,
    });

    res.status(201).json({ message: "Personagem registrado com sucesso!", character });
  } catch (error) {
    console.error("Erro ao registrar personagem:", error);
    res.status(500).json({ error: "Erro ao registrar personagem" });
  }
};

export const getCharacters = async (req: Request, res: Response) => {
  try {
    const character = await db("characters").select();
    res.status(200).json({ character });
    return 
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários." });
    return 
  }
};

export const removeCharacter = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await db("characters").where({id: id}).del();
    res.status(200).json({ mesage: "Personagem excluído com sucesso." });
    return 
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir personagem." });
    return 
  }
};
