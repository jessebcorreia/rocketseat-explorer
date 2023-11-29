const knex = require("../database/knex")

class TagsController {
  async index(req,res){
    const { user_id } = req.params

    const tags = await knex("tags")
      .where({ user_id }) // como o nome do campo é exatamente igual "user_id", não precisa colocar parâmetro valor > user_id: user_id

      return res.json(tags)
  }
}

module.exports = TagsController