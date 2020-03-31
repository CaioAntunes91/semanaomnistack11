const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// O próximo comando é utilizado para que a variável app utilizei o JSON como forma de comunicação
app.use(express.json());

// O próximo comando indica utilizara variável com as rotas exportada do rotues.js
app.use(routes);

// Comando responsável pela gestão de acessos. Inclusive é aqui que seria informado o domínio externo (dentro de um dos parâmetros) caso a aplicação já estivesse em produção
app.use(cors());



app.listen(3333);