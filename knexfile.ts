import path from "path";

// aqui nao foi utilizado o export default pq o knex nao entende essa sintaxe
module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite') // __dirname: retorna o diretorio atual / database.sqlite: arquivo de DB que sera 
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations') // __dirname: retorna o diretorio atual / o restante eh o caminho para o diretorio de migrations
    },
    useNullAsDefault: true // define para o sqlite o valor padrao NULL para campos nao preenchidos
}