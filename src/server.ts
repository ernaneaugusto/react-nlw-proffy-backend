import express from "express";

const port = 3333;
const app = express();
// configura express para entender requisicoes em formato JSON
app.use(express.json());

app.post('/', (req, res) => {
    const users = [
        { name: 'Ernane Augusto' },
    ];

    return res.send(users);
});

// faz aplicacao ouvir requisicoes http
app.listen(port);