import Knex from 'knex';

// configuracoes que sobrescrevem as implementacoes das funcoes padroes do Knex, pois nesse projeto utilizamos o Typescript e nao o JS
// o comando padrao do Knex para executar as migrations tambem foi alterado, ver mais no comando knex:COMANDO do package.json

export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        // criar relacionamento com a tabela classes
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE') // se atualizar o id da aula na tabela classes todos as outras tabelas que tem esse id tambem serao alterados
            .onDelete('CASCADE'); // se deletar a aula da tabela classes todas as suas dependencias serao deletadas tambem
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule');
}