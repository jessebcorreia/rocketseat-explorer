// import da classe Router, dentro do express
const { Router } = require("express")

// instância da classe Router
const usersRoutes = Router()

// já está dentro de /users (definido pelo index.js)
usersRoutes.post("/", (request, response) => {
  // desestruturação dos dados .JSON, dentro da requisição
  const {name, email, password} = request.body
  // apresentação da resposta, devolvendo os dados .JSON desestruturados
  response.json({name, email, password})
})

// exportação do módulo
module.exports = usersRoutes