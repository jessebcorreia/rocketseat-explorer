import { GithubUsers } from "./github-users.js";

export class Favorites {

  constructor(root){
    this.root = document.querySelector(root)
    this.tbody = document.querySelector("table tbody")
    this.load()
  }

  async add(username){
    
    const userAlreadyRegistered = this.entries.find(entry => entry.login === username)
    
    try{

      if(userAlreadyRegistered){
        throw new Error("Usuário já está cadastrado")
      }
  
      const user = await GithubUsers.search(username)

      if (user.login === undefined){
        throw new Error("Usuário não encontrado")
      }
  
      this.entries = [user, ...this.entries]
  
      this.update()
      this.save()
    } catch(err) {
      alert(err.message)
    }

  }

  save(){
    localStorage.setItem('@git-fav:', JSON.stringify(this.entries))
  }

  load(){
    this.entries = JSON.parse(localStorage.getItem('@git-fav:')) || []
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

export class FavoritesView extends Favorites {

  constructor(root){
    super(root)
    this.update()
    this.onAdd()
  }

  onAdd(){
    const addButton = document.querySelector("#search-button")
    addButton.onclick = () => {
      const { value } = document.querySelector("#search-input")
      this.add(value)
    }
  }

  update(){
    this.removeAllRows()
    this.entries.forEach( user => {
      const newRow = this.createRow(user.login, user.name, user.public_repos, user.followers)

      newRow.querySelector('.button-remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar esta linha?')
        if(isOk){
          this.delete(user)
        }
      }

      this.tbody.append(newRow)

    })
  }

  removeAllRows(){
    this.tbody.querySelectorAll('tr')
      .forEach( (tr) => {
        tr.remove()
      })
  }

  createRow(username, name, public_repos, followers){

    const htmlContent = `
    <tr>
      <td class="user">
        <img src="https://github.com/${username}.png" alt="foto de ${name}">
        <a href="https://github.com/${username}" target="_blank">
          <p>${name}</p>
          <span>${username}</span>
        </a>
      </td>
      <td>${public_repos}</td>
      <td>${followers}</td>
      <td><button class="button-remove">Remover</button></td>
    </tr>
    `

    const tr = document.createElement('tr')
    tr.innerHTML = htmlContent
    return tr
  }

}