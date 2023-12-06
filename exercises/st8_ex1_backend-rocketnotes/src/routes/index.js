// import da classe Router, dentro do express
const { Router } = require("express")

// instância da classe Router
const routes = Router()

// import das rotas de USUÁRIOS
const usersRoutes = require('./users.routes')

/* criação da rota /users. Não é mais necessário
  repetir /users, mas sim apenas definir subrotas,
  dentro do users.routes.js */
routes.use("/users", usersRoutes)

// exportação do módulo
module.exports = routes