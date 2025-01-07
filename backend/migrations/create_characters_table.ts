import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("characters", (table) => {
    table.increments("id").primary(); // ID auto incrementado
    table.string("name").notNullable();
    table.string("image").notNullable();
    table.string("type").notNullable();
    table.integer("vitality").notNullable();
    table.integer("mind").notNullable();
    table.integer("tenacity").notNullable();
    table.integer("strength").notNullable();
    table.integer("dexterity").notNullable();
    table.integer("intelligence").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("characters");
}
