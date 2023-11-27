import { GitHubUser } from "./github-user.js"

// classe que vai conter a lógica dos dados
// como os dados serão estruturados
class Favorites {

  constructor(root){
    this.root = document.querySelector(root)
    this.load()
    this.tbody = this.root.querySelector('table tbody')
  }

  async add(username){

    const userExists = this.entries.find(entry => entry.login === username)

    if(userExists){
      console.log('teste')
      throw new Error('Usuário já cadastrado')
    }

    try{
      const user = await GitHubUser.search(username)
      if(user.login === undefined){
        throw new Error('Usuário não encontrado!')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    } catch(error){
      alert(error.message)
    }
  }

  load(){
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save(){
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  delete(user){
    const filteredEntries = this.entries.filter((entry) => {
      return entry.login !== user.login
    })
    this.entries = filteredEntries
    this.update()
    this.save()
  }

}

//classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {

  constructor(root) {
    super(root)
    this.update()
    this.onAdd()
  }

  onAdd(){
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')
      this.add(value)
    }
  }

  update(){
    this.removeAllRows()
    this.entries.forEach( user => {
      const row = this.createRow(user.name, user.login, user.public_repos, user.followers)      
      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar essa linha?')
        if(isOk){
          this.delete(user)
        }
      }
      this.tbody.append(row)
    })
  }

  removeAllRows(){
    this.tbody.querySelectorAll('tr')
      .forEach( (tr) => {
        tr.remove()
      })
  }

  createRow(userName, userLogin, publicRepos, followers){
    const content = `
      <td class="user">
        <img src="https://github.com/${userLogin}.png" alt="imagem de ${userName}">
        <a href="https://github.com/${userLogin}" target="_blank">
          <p>${userName}</p>
          <span>${userLogin}</span>
        </a>
      </td>
      <td class="repositories">
        ${publicRepos}
      </td>
      <td class="followers">
        ${followers}
      </td>
      <td>
        <button class="remove">&times;</button>
      </td>
    `
    const tr = document.createElement('tr')
    tr.innerHTML = content
    return tr
  }

}