import knex from "knex";
import path from "path";

// o Knex aceita varios tipos de BD(sqlite, mysql, mongo, etc)
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') // __dirname: retorna o diretorio atual / database.sqlite: arquivo de DB que sera criado
    },
    useNullAsDefault: true, // define para o sqlite o valor padrao NULL para campos nao preenchidos
});

export default db;