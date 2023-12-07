const { Router } = require("express")

const UsersController = require("../controllers/NotesController")

const notesRoutes = Router()

const notesController = new UsersController()

notesRoutes.get   ("/"          , notesController.index ) //user_id: query
notesRoutes.post  ("/:user_id"  , notesController.create) //user_id: parâmetro
notesRoutes.get   ("/:id"       , notesController.show  )
notesRoutes.delete("/:id"       , notesController.delete)

module.exports = notesRoutes