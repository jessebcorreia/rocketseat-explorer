exports.up = knex => knex.schema.createTable("movies", table => {
  table.increments("id").primary()
  table.text("title")
  table.text("description")
  table.integer("rating").defaultTo(1).notNullable().checkIn([1, 2, 3, 4, 5])
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("movies")