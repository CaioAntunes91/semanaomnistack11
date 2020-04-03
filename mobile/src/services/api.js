import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.5:3333'//Neste caso o axios não está buscando no localhost pois a aplicação não está rodando na mesma máquina, mas sim no celular.
});

export default api;