require("express-async-errors")
const express = require("express") // import do framework express
const AppError = require("./utils/AppError")
const routes = require("./routes") // import das rotas definidas na pasta "routes"

const app = express() // instância do express()

// adiciona uma espécie de "camada" no express
app.use(express.json()) // conversão dos dados para .JSON
app.use(routes) // aplicação das rotas

app.use( (error, request, response, next) => {
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
})

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))