const { Router } = require("express") // import do método Router, dentro do express

const routes = Router() // instância do método Router

const usersRoutes = require('./users.routes') // import das rotas de USUÁRIOS
const notesRoutes = require('./notes.routes') // import das rotas de NOTAS

/* criação da rota /users. Não é mais necessário
  repetir /users, mas sim apenas definir subrotas,
  dentro do users.routes.js */
routes.use("/users", usersRoutes)
routes.use("/notes", notesRoutes)

module.exports = routes // exportação do módulo