exports.up = knex => knex.schema.createTable("links", table =>{
  table.increments("id")
  table.text("url").notNullable() //não aceita valores nulos
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE") //ao deletar uma nota, todas as tags vinculadas serão deletadas também.
})

exports.down = knex => knex.schema.dropTable("links")