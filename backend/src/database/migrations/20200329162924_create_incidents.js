
exports.up = function(knex) {
    return  knex.schema.createTable('incidents', function(table) {
        table.increments();
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable(); // chave referência que será utilizada no relacionamento das tabelas

        table.foreign('ong_id').references('id').inTable('ongs'); // Comando responsável por criar relacionamento entre tabelas do banco de dados
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
