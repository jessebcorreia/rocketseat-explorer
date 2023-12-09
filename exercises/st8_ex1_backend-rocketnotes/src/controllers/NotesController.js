const knex = require("../database/knex") //import do index knex (conexão com banco de dados)

class NotesController {

  async create(request, response){
    const {title, description, tags, links} = request.body
    const { user_id } = request.params

    //por algum motivo, é necessário colocar o note_id entre colchetes
    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id
    })

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })

    await knex("links").insert(linksInsert)

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })

    await knex("tags").insert(tagsInsert)

    response.status(201).json({
      message: 'A nota foi criada com sucesso'
    })

  }
  
  async show(request, response){
    const { id } = request.params //desestrutura o id dentro do parâmetro da requisição

    const note = await knex("notes").where({id}).first()
    const tags = await knex("tags").where({note_id: id}).orderBy("name")
    const links = await knex("links").where({note_id: id}).orderBy("created_at")

    return response.json({
      ...note,
      tags,
      links
    })
  }

  async delete(request, response){
    const { id } = request.params
    
    await knex("notes").where({id}).delete()

    return response.json({
      message: "A nota foi deletada, juntamente com todas as tags e os links vinculados a ela"
    })

  }

  async index(request, response){
    const { user_id, title, tags } = request.query

    let notes

    if(tags){ //verifica se as tags estão sendo informadas ou não
      const filteredTags = tags.split(',').map(tag => tag.trim()) //converte a string tags em um array

      notes = await knex("tags")
        .select([ //seleciona as colunas da tabela tags
          "notes.id",
          "notes.title",
          "notes.user_id",
        ])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filteredTags)
        .innerJoin("notes", "notes.id", "tags.note_id") //junta as tabelas notas e tags
        .orderBy("notes.title")
    } else {
      //se as tags não forem informadas, então retorna todas as notas do usuário
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const userTags = await knex("tags").where({user_id}) //busca todas as tags do usuário
    const notesWithTags = notes.map( note => { //percorre todas as notas filtradas acima
      const noteTags = userTags.filter( tag => { //percorre todas as tags do usuário.
        
        //A função filter mantém na array todos os valores que retornarem TRUE, e elimina os valores FALSE. Se o resultado da validação abaixo retornar falso, a tag é eliminada da array
        // tag.note_id : pega o note_id da tag no loop FILTER (todas as tags do usuário) 
        // note.id     : pega a tag da nota (que também está no loop MAP)
        return tag.note_id === note.id // TRUE: mantém na array | FALSE: elimina da array
      })

      return { //enquanto estiver no loop map, vai adicionando as notas e incluindo as tags nelas
        ...note,
        tags: noteTags
      }

    })

    return response.json(notesWithTags)
  }

}

module.exports = NotesController