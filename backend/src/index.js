const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// Comando responsável pela gestão de acessos. Inclusive é aqui que seria informado o domínio externo (dentro de um dos parâmetros) caso a aplicação já estivesse em produção. Além disso, esse comando deve vir sempre logo após a declaração do express e antes do vínculo com as rotas.
app.use(cors());

// O próximo comando é utilizado para que a variável app utilizei o JSON como forma de comunicação
app.use(express.json());

// O próximo comando indica utilizara variável com as rotas exportada do rotues.js
app.use(routes);





app.listen(3333);