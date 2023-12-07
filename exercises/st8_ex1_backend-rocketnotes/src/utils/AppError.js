class AppError {
  message; // declaração da variável/atributo no início
  statusCode; // ficará disponível em toda a classe

  constructor(message, statusCode = 400){
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = AppError