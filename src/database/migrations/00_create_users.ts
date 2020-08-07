import Knex from 'knex';

// configuracoes que sobrescrevem as implementacoes das funcoes padroes do Knex, pois nesse projeto utilizamos o Typescript e nao o JS
// o comando padrao do Knex para executar as migrations tambem foi alterado, ver mais no comando knex:COMANDO do package.json

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}