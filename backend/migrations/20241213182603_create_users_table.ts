import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary(); // ID auto incrementado
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("cpf").notNullable().unique();
    table.string("telefone").notNullable();
    table.string("senha").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
