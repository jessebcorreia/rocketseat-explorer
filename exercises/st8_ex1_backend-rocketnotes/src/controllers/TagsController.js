const knex = require("../database/knex")

class TagsController {

  async index(request, response){
    const {user_id} = request.params

    const tags = await knex("tags").where({ user_id: user_id }) //nome da coluna | parâmetro

    response.json(tags)
  }

}

module.exports = TagsController