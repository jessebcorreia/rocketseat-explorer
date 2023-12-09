exports.up = knex => knex.schema.createTable("notes", table =>{
  table.increments("id") //cria a coluna de id (do tipo auto increment)
  table.text("title") //cria uma coluna de texto chamada para o título
  table.text("description")
  table.integer("user_id").references("id").inTable("users") //foreign key
  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("notes")