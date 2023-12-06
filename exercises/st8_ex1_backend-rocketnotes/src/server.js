// import do framework express
const express = require("express")

// import das rotas definidas na pasta "routes"
const routes = require("./routes")

// instância do express()
const app = express()

// adiciona uma espécie de "camada" no express (middlewares)
// conversão dos dados para .JSON
app.use(express.json())
// aplicação das rotas
app.use(routes)

const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))