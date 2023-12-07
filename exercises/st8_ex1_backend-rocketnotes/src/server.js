require("express-async-errors")
const express = require("express") // import do framework express
const AppError = require("./utils/AppError") // import da classe de erro
const routes = require("./routes") // import das rotas definidas na pasta "routes"
const database = require("./database/sqlite") // import do banco de dados

const app = express() // instância do express()

database()

// função para lidar com os erros da aplicação (utilizando classe própria)
function errorHandler(error, request, response, next) {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error)
  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
}

// adiciona uma espécie de "camada" no express
app.use(express.json()) // conversão dos dados para .JSON
app.use(routes) // aplicação das rotas
app.use(errorHandler)

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))