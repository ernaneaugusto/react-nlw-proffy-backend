import Knex from 'knex';

// configuracoes que sobrescrevem as implementacoes das funcoes padroes do Knex, pois nesse projeto utilizamos o Typescript e nao o JS
// o comando padrao do Knex para executar as migrations tambem foi alterado, ver mais no comando knex:COMANDO do package.json

export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        // criar relacionamento com a tabela users
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        // @TODO: adicionar o nome da aula que o aluno selecionou ao entrar em contato com o professor

        // campo timestamp com o horario atual
        table.timestamp('created_at')
            .defaultTo('now()')
            .notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
}