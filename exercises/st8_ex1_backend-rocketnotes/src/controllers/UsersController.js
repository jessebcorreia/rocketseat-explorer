const AppError = require("../utils/AppError")

class UsersController {
  /** Um controller deve ter,
      no máximo, 5 métodos: 
   * INDEX  : método GET()
   * SHOW   : método GET()
   * CREATE : método POST()
   * UPDATE : método PUT()
   * DELETE : método DELETE()   */

  create(request, response){
    const {name, email, password} = request.body // desestruturação dos dados .JSON, dentro da requisição

    if(!name){
      throw new AppError("O nome é obrigatório", 401)
    }

    response.status(201).json({name, email, password}) // apresentação da resposta, devolvendo os dados .JSON desestruturados
  }

}

module.exports = UsersController