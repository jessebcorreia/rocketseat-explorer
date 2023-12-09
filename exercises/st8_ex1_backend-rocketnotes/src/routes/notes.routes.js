// import da classe Router, dentro do express
const { Router } = require("express")
const NotesController = require("../controllers/NotesController")

const notesRoutes = Router() // instância do método Router, do framework express
const notesController = new NotesController() // instância da classe NotesController, criada por mim

notesRoutes.get("/"         , notesController.index)
notesRoutes.post("/:user_id", notesController.create)
notesRoutes.get("/:id"      , notesController.show)
notesRoutes.delete("/:id"   , notesController.delete)

module.exports = notesRoutes // exportação do módulo