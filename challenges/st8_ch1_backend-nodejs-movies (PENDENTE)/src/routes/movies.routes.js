const { Router } = require("express")

const MoviesController = require("../controllers/MoviesController")

const moviesRoutes = Router()
const moviesController = new MoviesController()

moviesRoutes.post  ("/"        , moviesController.create)
moviesRoutes.get   ("/:user_id", moviesController.index)
moviesRoutes.get   ("/:id"     , moviesController.show)
moviesRoutes.delete("/:id"     , moviesController.delete)

module.exports = moviesRoutes