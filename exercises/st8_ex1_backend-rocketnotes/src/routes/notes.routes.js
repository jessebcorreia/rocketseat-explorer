// import da classe Router, dentro do express
const { Router } = require("express")
const NotesController = require("../controllers/NotesController")

const notesRoutes = Router() // instância do método Router, do framework express
const notesController = new NotesController() // instância da classe NotesController, criada por mim

notesRoutes.post("/:user_id", notesController.create) // já está dentro de /notes (definido pelo index.js)
notesRoutes.get("/:id", notesController.show)

module.exports = notesRoutes // exportação do módulo