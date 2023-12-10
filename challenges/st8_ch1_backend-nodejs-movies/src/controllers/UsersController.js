const { hash, compare } = require("bcryptjs")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class UsersController {

  async create(req, res){
    const {name, email, password} = req.body

    if(!name || !email || !password){
      throw new AppError('Preencha todos os campos')
    }

    const users = await knex("users").where({email})

    if(users.length > 0){
      throw new AppError('Este e-mail já está em uso')
    }

    const hashedPassword = await hash(password, 8)

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    })

    res.status(201).json({
      message: "Usuário criado com sucesso!"
    })

  }

  async update(req, res){
    const {name, email, password, oldPassword} = req.body
    const { id } = req.params

    const user = await knex("users").where({id}).first()
    if(!user){
      throw new AppError('Usuário não encontrado')
    }

    const checkUserEmail = await knex("users").where({ email }).whereNot({ id: user.id }).first()

    if (checkUserEmail) {
      throw new AppError('Este e-mail já está em uso por outro usuário');
    }

    user.name = name || user.name
    user.email = email || user.email

    if(password || oldPassword){
      const checkPassword = await compare(oldPassword, user.password)
      if(!checkPassword){
        throw new AppError('Verifique se a senha antiga foi informada corretamente')
      }
      const hashedPassword = await hash(password, 8)
      user.password = hashedPassword || user.password
    }

    await knex("users")
      .update({
        name: user.name,
        email: user.email,
        password: user.password
      })
      .where({id})

    res.status(200).json({
      message: "Os dados do usuário foram atualizados com sucesso!"
    })
  }

}

module.exports = UsersController