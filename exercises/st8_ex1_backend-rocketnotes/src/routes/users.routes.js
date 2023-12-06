// import da classe Router, dentro do express
const { Router } = require("express")
const UsersController = require("../controllers/UsersController")

const usersRoutes = Router() // instância do método Router, do framework express
const usersController = new UsersController() // instância da classe UsersController, criada por mim

usersRoutes.post("/", usersController.create) // já está dentro de /users (definido pelo index.js)

module.exports = usersRoutes // exportação do módulo