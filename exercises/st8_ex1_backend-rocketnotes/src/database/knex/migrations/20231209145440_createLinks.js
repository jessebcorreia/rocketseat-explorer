exports.up = knex => knex.schema.createTable("links", table =>{
  table.increments("id")
  table.text("url").notNullable() //não aceita valores nulos
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE") //ao deletar uma nota, todas as tags vinculadas serão deletadas também.
  table.timestamp("created_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("links")