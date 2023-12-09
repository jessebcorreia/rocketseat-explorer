// import da classe Router, dentro do express
const { Router } = require("express")
const TagsController = require("../controllers/TagsController")

const tagsRoutes = Router() // instância do método Router, do framework express
const tagsController = new TagsController() // instância da classe TagsController, criada por mim

tagsRoutes.get("/:user_id", tagsController.index)

module.exports = tagsRoutes // exportação do módulo