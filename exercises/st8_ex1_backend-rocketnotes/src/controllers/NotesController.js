const knex = require("../database/knex") //import do index knex (conexão com banco de dados)

const AppError = require("../utils/AppError")

class NotesController {

  async create(request, response){
    const {title, description, tags, links} = request.body
    const { user_id } = request.params

    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id
    })

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })

    await knex("links").insert(linksInsert)

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })

    await knex("tags").insert(tagsInsert)

    response.status(201).json({
      message: 'A nota foi cadastrada com sucesso'
    })

  }
  
  async show(request, response){
    const { id } = request.params

    const note = await knex("notes").where({id}).first()
    const tags = await knex("tags").where({note_id: id}).orderBy("name")
    const links = await knex("links").where({note_id: id}).orderBy("created_at")

    return response.json({
      ...note,
      tags,
      links
    })

  }

  async delete(request, response){
    const { id } = request.params
  }

}

module.exports = NotesController