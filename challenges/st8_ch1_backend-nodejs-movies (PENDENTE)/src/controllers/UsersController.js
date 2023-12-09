class UsersController {

  async create(req, res){
    const {name, email, password} = req.body
    res.json({name, email, password})
  }

  async update(req, res){
    const {name, email, password, oldPassword} = req.body
    const { id } = req.params
    res.json({ name, email, password, oldPassword })
  }

}

module.exports = UsersController