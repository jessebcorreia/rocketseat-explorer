const knex = require("../database/knex")

class MoviesController {

  async create(req, res){
    const { title, description, rating, tags } = req.body
    const { user_id } = req.params

    const [movie_id] = await knex("movies").insert({
      title, description, rating, user_id
    })

    const tagsInsert = tags.map( name => {
      return {
        movie_id, //movie_id é definida pela constate acima
        user_id,
        name
      }
    })

    await knex("tags").insert(tagsInsert)

    res.status(201).json({
      message: "Registro criado com sucesso!"
    })
  }

  async delete(req, res){
    const { id } = req.params

    await knex("movies").where({id}).delete()
    res.json({
      message: "O registro foi deletado!"
    })
  }

  async show(req, res){
    const { id } = req.params

    const movie = await knex("movies").where({id}).first()
    const tags = await knex("tags").where({movie_id: movie.id}).orderBy("name")

    res.json({
      ...movie,
      tags
    })
  }

  async index(req, res){
    const { user_id, title, tags } = req.query

    let movies

    if(tags){
      const filteredTags = tags.split(',').map(tag => tag.trim())
      
      movies = await knex("tags")
        .select([
          "movies.id",
          "movies.user_id",
          "movies.title"
        ])
        .where("movies.user_id", user_id)
        .whereLike("movies.title", `%${title}%`)
        .whereIn("tags.name", filteredTags)
        .innerJoin("movies", "movies.id", "tags.movie_id")
        .orderBy("movies.title")
    } else {
      movies = await knex("movies")
        .where({user_id})
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const userTags = await knex("tags").where({user_id})
    const moviesWithTags = movies.map( movie => {
      const movieTags = userTags.filter( tag => tag.movie_id === movie.id )
      return {
        ...movie,
        tags: movieTags
      }
    })

    res.json(moviesWithTags)

  }

}

module.exports = MoviesController