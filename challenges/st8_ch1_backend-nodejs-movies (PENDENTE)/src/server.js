require("express-async-errors")
const express = require("express")

const AppError = require("./utils/AppError")
const routes = require("./routes")

function errorHandler(err, req, res, next){
  if(err instanceof AppError){
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    })
  }

  console.error(err)

  return res.status(500).json({
    status: "error",
    message: err.message
  })
}

const app = express()
app.use(express.json())
app.use(routes)
app.use(errorHandler)


const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))