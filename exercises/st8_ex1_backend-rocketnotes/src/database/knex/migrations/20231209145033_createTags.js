exports.up = knex => knex.schema.createTable("tags", table =>{
  table.increments("id")
  table.text("name").notNullable() //não aceita valores nulos
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE") //ao deletar uma nota, todas as tags vinculadas serão deletadas também.
  table.integer("user_id").references("id").inTable("users") //foreign key
})

exports.down = knex => knex.schema.dropTable("tags")