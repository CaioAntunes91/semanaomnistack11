const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
       
        const [count] = await connection('incidents').count();// Declarar a variável dessa forma funciona da mesma forma que declarar count e depois dizer count=count[0].

        const incidents = await connection('incidents')
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ])
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page-1)*5)// Com o comando offset o select inicia a partir do registro informado e com o limit seleciona os próximos 5;

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
    
    async create(request, response) {
        // console.log(request.body.title);
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; // Cabeçalho da requisição (normalmente tem a ver com autenticação que é como vamos ter acesso ao id da ONG que está cadastrando o caso)

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .select(
                'ong_id'
            )
            .where('id', id)
            .first();
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: "Operation not permitted." });// O método status se refere à um código do protocolo http. Esse código utiliza como padrão o número 200 que indica "autorizado" e o código 401 é responsável por não autorizar a requisição.
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();// Novamente estamos utilizando um código do protocolo HTTP. 204 indica que a requisição teve sucesso mas não existe uma resposta para o usuário
    }
};