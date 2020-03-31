// Método up é responsável por criar a tabela
exports.up = function(knex) {
  return  knex.schema.createTable('ongs', function(table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // O segundo parâmetro é responsável por informar a quantidade de dígitos do campo da tabela
  })
};

// Método down é responsável por desfazer e deletar a tabela
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
