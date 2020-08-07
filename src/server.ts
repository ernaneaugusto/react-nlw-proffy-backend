import express from "express";
import routes from "./routes";

const port = 3333;
const app = express();
// configura express para entender requisicoes em formato JSON
app.use(express.json());
app.use(routes);

app.post('/', (req, res) => {
    return res.send();
});

// faz aplicacao ouvir requisicoes http
app.listen(port);