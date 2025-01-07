import express from "express";
import cors from "cors";
import CharacterRoutes from "./routes/characters.routes";
import UserRoutes from "./routes/user.routes";

const app = express();
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:5173']
};
app.use(cors(corsOptions));
const PORT = 5001;

// Middlewares globais
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Rotas
app.use("/characters", CharacterRoutes);
app.use("/users", UserRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
