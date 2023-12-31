const { Router } = require("express")

const MoviesController = require("../controllers/MoviesController")

const moviesRoutes = Router()
const moviesController = new MoviesController()

moviesRoutes.get   ("/"         , moviesController.index)
moviesRoutes.get   ("/:id"      , moviesController.show)
moviesRoutes.delete("/:id"      , moviesController.delete)
moviesRoutes.post  ("/:user_id" , moviesController.create)

module.exports = moviesRoutes