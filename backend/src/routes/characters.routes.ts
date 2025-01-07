import { Router } from "express";
import { getCharacters, registerCharacter, removeCharacter } from "../controllers/characters.controller";

const CharacterRoutes = Router();

CharacterRoutes.get("/", getCharacters);
// Rota para registro
CharacterRoutes.post("/", registerCharacter);

CharacterRoutes.delete("/:id", removeCharacter);



export default CharacterRoutes;
