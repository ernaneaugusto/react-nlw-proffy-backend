import Knex from 'knex';

// configuracoes que sobrescrevem as implementacoes das funcoes padroes do Knex, pois nesse projeto utilizamos o Typescript e nao o JS
// o comando padrao do Knex para executar as migrations tambem foi alterado, ver mais no comando knex:COMANDO do package.json

export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.string('cost').notNullable();

        // criar relacionamento com a tabela users
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE') // se atualizar o id do professor na tabela users todos as outras tabelas que tem esse id tambem serao alterados
            .onDelete('CASCADE'); // se deletar um professor todas as suas aulas serao deletadas tambem
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('classes');
}