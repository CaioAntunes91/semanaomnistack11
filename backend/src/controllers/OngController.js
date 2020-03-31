const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {

    async index(request, response) {
            const ongs = await connection('ongs').select('*');
        
            return response.json(ongs);
        },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
        
        await connection("ongs").insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        }) //  Foi utilizado uma função assincrona juntamente com o await para garantir o retorno do banco de dados antes que desse sequência no processamento da função

        return response.json({ id });
    }
};