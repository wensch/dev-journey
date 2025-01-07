import { Knex } from "knex";

const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./database.sqlite", // Caminho para o arquivo do banco de dados
  },
  useNullAsDefault: true, // Necessário para o SQLite
};

export default config;
