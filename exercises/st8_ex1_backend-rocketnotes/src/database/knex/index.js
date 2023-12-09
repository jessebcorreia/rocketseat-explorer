const config = require("../../../knexfile") //import das configurações do KNEX
const knex = require("knex") //import do próprio KNEX

const connection = knex(config.development) //recebe como parâmetro as configurações

module.exports = connection //exporta a conexão para ser utilizada em outros lugares

