const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class UsersController {
  /** Um controller deve ter,
      no máximo, 5 métodos: 
   * INDEX  : método GET()
   * SHOW   : método GET()
   * CREATE : método POST()
   * UPDATE : método PUT()
   * DELETE : método DELETE()   */

  async create(request, response){
    const {name, email, password} = request.body // desestruturação dos dados .JSON, dentro da requisição

    const database = await sqliteConnection()
    const userExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])//método get para buscar no banco de dados o e-mail do usuário. Se não encontrar, retornará falso

    if(userExists){
      throw new AppError('Este e-mail já está em uso')
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      //para executar um comando SQL, basta usar o método 'run' da conexão sqlite criada
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    )

    return response.status(201).json({
      mensagem: "usuário criado com sucesso"
    })
  }

  async update(request, response){
    const { name, email, password, oldPassword } = request.body
    const { id } = request.params
    const database = await sqliteConnection()

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]) //busca dentro do banco de dados o ID informado como parâmetro da requisição. Irá retornar a linha inteira.

    if(!user){
      throw new AppError('Usuário não encontrado') //se não encontrar dentro do banco de dados, retorna erro.
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]) //busca uma linha no banco de dados em que o email seja igual ao email informado no corpo da requisição, ou seja, o e-mail para o qual se deseja a substituição (novo email)

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      //se encontrar algum e-mail, então verifica se o e-mail encontrado, por acaso, é o e-mail atual do usuário. Se não for este o caso, ou seja, o email for de outra pessoa, então retorna erro.
      throw new AppError('Este e-mail já está em uso')
    }

    user.name = name ?? user.name // nulish operator
    user.email = email // nulish operator

    // confere se a senha antiga foi informada
    if(password && !oldPassword){
      throw new AppError('Informe a senha antiga')
    }

    // confere se a senha nova e antiga foram informadas
    if(password && oldPassword){
      const checkOldPassword = await compare(oldPassword, user.password) //compara a senha antiga com a senha nova
      if(!checkOldPassword){
        throw new AppError('A senha antiga está incorreta')
      }
      user.password = await hash(password, 8)
    }

    await database.run(
      `UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, id]
      )
    
    return response.status(200).json({
      message: "usuário atualizado"
    })

  }

}

module.exports = UsersController